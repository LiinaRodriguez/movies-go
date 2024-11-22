package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type OmdbClient struct {
	apiKey string
}

func NewOmdbClient(apiKey string) *OmdbClient {
	return &OmdbClient{apiKey: apiKey}
}

type OMDBResponse struct {
	Title   string   `json:"Title"`
	Ratings []Rating `json:"Ratings"`
}

type Rating struct {
	Source string `json:"Source"`
	Value  string `json:"Value"`
}

func (c *OmdbClient) GetMovieRating(imdbID string) (float64, error) {
	url := fmt.Sprintf("http://www.omdbapi.com/?i=%s&apikey=%s", imdbID, c.apiKey)

	response, err := http.Get(url)
	if err != nil {
		return 0, fmt.Errorf("Error fetching movie rating: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return 0, fmt.Errorf("Unexpected status code: %d", response.StatusCode)
	}

	var result OMDBResponse
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return 0, fmt.Errorf("Error decoding OMDB response: %w", err)
	}

	// Buscar el rating de IMDb
	for _, rating := range result.Ratings {
		if rating.Source == "Internet Movie Database" {
			var score float64
			_, err := fmt.Sscanf(rating.Value, "%f", &score)
			if err != nil {
				return 0, fmt.Errorf("Error parsing IMDb rating: %w", err)
			}
			return score, nil
		} else if rating.Source == "Rotten Tomatoes" {
			var score float64
			_, err := fmt.Sscanf(rating.Value, "%f", &score)
			if err != nil {
				return 0, fmt.Errorf("Error parsing Rotten Tomatoes rating: %w", err)
			}
			return score / 10, nil
		}
	}

	return 0, fmt.Errorf("No IMDb rating found for %s", imdbID)
}
