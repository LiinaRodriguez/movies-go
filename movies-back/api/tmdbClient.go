package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

type Media struct {
	ID          int     `json:"id"`
	Title       string  `json:"title,omitempty"` // Para películas
	Name        string  `json:"name,omitempty"`  // Para series
	Overview    string  `json:"overview"`
	PosterPath  string  `json:"poster_path"`
	ReleaseDate string  `json:"release_date"`
	IMDBID      string  `json:"imdb_id"`
	Rating      float64 `json:"rating"`
}

type ExternalId struct {
	Id     int    `json:"id"`
	ImdbID string `json:"imdb_id"`
}

type TmdbMedia struct {
	ID          int    `json:"id"`
	Title       string `json:"title,omitempty"` // Para películas
	Name        string `json:"name,omitempty"`  // Para series
	Overview    string `json:"overview"`
	PosterPath  string `json:"poster_path"`
	ReleaseDate string `json:"release_date"`
}

type TmdbMediaResults struct {
	Results []TmdbMedia `json:"results"`
}

type TmdbClient interface {
	FetchMedia(MediaType string) ([]Media, error)
	GetExternalId(movieId string) (string, error)
	FindMovie(movieName string) ([]Media, error)
	FindMovieById(movieid string) (Media, error)
}

type tmdbClient struct {
	apiKey string
	omdb   *OmdbClient // Referencia al cliente OMDB
}

func (c *tmdbClient) GetExternalId(movieId string) (string, error) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%s/external_ids?api_key=%s", movieId, c.apiKey)

	response, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("error fetching media: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", response.StatusCode)
	}

	var result ExternalId
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("error decoding response: %w", err)
	}

	if result.ImdbID == "" {
		return "", fmt.Errorf("no id found for : %s", movieId)
	}

	return result.ImdbID, nil
}

func NewTmdbClient(apiKey string, omdbClient *OmdbClient) *tmdbClient {
	return &tmdbClient{apiKey: apiKey, omdb: omdbClient}
}

func (c *tmdbClient) FetchMedia(mediaType string) ([]Media, error) {
	var url string
	if mediaType == "movie" {
		url = fmt.Sprintf("https://api.themoviedb.org/3/discover/movie?api_key=%s", c.apiKey)
	} else if mediaType == "tv" {
		url = fmt.Sprintf("https://api.themoviedb.org/3/discover/tv?api_key=%s", c.apiKey)
	} else {
		url = fmt.Sprintf("https://api.themoviedb.org/3/discover/movie?api_key=%s", c.apiKey)
	}

	response, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching media: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", response.StatusCode)
	}

	var result TmdbMediaResults
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("error decoding response: %w", err)
	}

	if len(result.Results) == 0 {
		return nil, fmt.Errorf("no media found for type: %s", mediaType)
	}

	fmt.Println(result)

	var mediaResults []Media
	for _, media := range result.Results {
		externalId, err := c.GetExternalId(fmt.Sprintf("%d", media.ID))
		if err != nil {
			return nil, fmt.Errorf("error fetching external id: %w", err)
		}

		var mediaRating float64
		if externalId != "" {

			mediaRating, err = c.omdb.GetMovieRating(externalId)
			if err != nil {

				fmt.Printf("Error fetching rating for %s: %v\n", externalId, err)
				mediaRating = 0
			}
		}

		mediaResults = append(mediaResults, Media{
			ID:          media.ID,
			Title:       media.Title,
			Name:        media.Name,
			Overview:    media.Overview,
			PosterPath:  media.PosterPath,
			ReleaseDate: media.ReleaseDate,
			IMDBID:      externalId,
			Rating:      mediaRating,
		})
	}

	return mediaResults, nil
}

func (c *tmdbClient) FindMovie(name string) ([]Media, error) {
	apiURL := "https://api.themoviedb.org/3/search/movie"
	apiKey := utils.GetEnv("TMDB_API_TOKEN")
	query := name
	params := url.Values{}
	params.Add("query", query)
	params.Add("include_adult", "true")
	params.Add("language", "en-US")
	params.Add("page", "1")

	fullURL := fmt.Sprintf("%s?%s", apiURL, params.Encode())

	// Creación de la solicitud
	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", apiKey))

	// Ejecución de la solicitud
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error executing request: %w", err)
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(res.Body)
		return nil, fmt.Errorf("unexpected status code: %d, response: %s", res.StatusCode, string(body))
	}

	var result TmdbMediaResults
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("error decoding response: %w", err)
	}
	fmt.Println(result)

	if len(result.Results) == 0 {
		return nil, fmt.Errorf("no media found for query: %s", name)
	}

	var mediaResults []Media
	for _, media := range result.Results {
		externalId, err := c.GetExternalId(fmt.Sprintf("%d", media.ID))
		if err != nil {
			fmt.Printf("Skipping media %d due to error fetching external ID: %v\n", media.ID, err)
			continue
		}

		var mediaRating float64
		if externalId != "" {
			mediaRating, err = c.omdb.GetMovieRating(externalId)
			if err != nil {
				fmt.Printf("Error fetching rating for %s: %v\n", externalId, err)
				mediaRating = 0
			}
		}

		mediaResults = append(mediaResults, Media{
			ID:          media.ID,
			Title:       media.Title,
			Name:        media.Name,
			Overview:    media.Overview,
			PosterPath:  media.PosterPath,
			ReleaseDate: media.ReleaseDate,
			IMDBID:      externalId,
			Rating:      mediaRating,
		})
	}

	return mediaResults, nil
}

func (c *tmdbClient) FindMovieById(movie string) (Media, error) {
	movie = "tt" + movie
	url := fmt.Sprintf("https://api.themoviedb.org/3/find/%s?external_source=imdb_id", movie)
	apiKey := utils.GetEnv("TMDB_API_TOKEN")

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Printf("Error creating request: %v\n", err)
		return Media{}, fmt.Errorf("error creating request: %w", err)
	}
	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	// Ejecutar la solicitud HTTP.
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Error executing request: %v\n", err)
		return Media{}, fmt.Errorf("error executing request: %w", err)
	}
	defer res.Body.Close()

	// Definir la estructura para mapear la respuesta JSON de la API.
	var result struct {
		MovieResults []TmdbMedia `json:"movie_results"`
	}

	// Decodificar la respuesta JSON.
	if err = json.NewDecoder(res.Body).Decode(&result); err != nil {
		fmt.Printf("Error decoding response: %v\n", err)
		return Media{}, fmt.Errorf("error decoding response: %w", err)
	}

	// Verificar si se encontraron resultados.
	if len(result.MovieResults) == 0 {
		fmt.Printf("No media found for movie ID: %s\n", movie)
		return Media{}, fmt.Errorf("no media found for movie ID: %s", movie)
	}
	movieResults := result.MovieResults[0]

	// Obtener la calificación de la película (suponiendo que la función GetMovieRating existe).
	mediaRating, err := c.omdb.GetMovieRating(movie)
	if err != nil {
		fmt.Printf("Error getting movie rating: %v\n", err)
		return Media{}, fmt.Errorf("error getting movie rating: %w", err)
	}

	// Mapear los resultados de TMDb al tipo Media.
	mediaResult := Media{
		ID:          movieResults.ID,
		Title:       movieResults.Title,
		Overview:    movieResults.Overview,
		PosterPath:  movieResults.PosterPath,
		ReleaseDate: movieResults.ReleaseDate,
		IMDBID:      movie,       // Asumimos que `movie` es el ID de IMDb.
		Rating:      mediaRating, // Asumimos que `mediaRating` es el rating de la película.
	}

	return mediaResult, nil
}
