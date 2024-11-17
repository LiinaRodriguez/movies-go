package api

import (
	"encoding/json"
	"fmt"
	"net/http"
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
}

type tmdbClient struct {
	apiKey string
	omdb   *omdbClient // Referencia al cliente OMDB
}

func NewTmdbClient(apiKey string, omdbClient *omdbClient) *tmdbClient {
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
