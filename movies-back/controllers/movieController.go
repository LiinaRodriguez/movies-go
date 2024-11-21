package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"net/http"
)

type MovieController struct {
	movieService services.MovieService
}

func NewMovieController(movieService services.MovieService) *MovieController {
	return &MovieController{movieService}
}

func (c *MovieController) GetMedia(w http.ResponseWriter, r *http.Request) {
	mediaType := r.URL.Query().Get("type")
	if mediaType == "" {
		mediaType = "both"
	}
	fmt.Printf("Controller: %s\n", mediaType)
	movies, err := c.movieService.GetMedia(mediaType)
	if err != nil {
		http.Error(w, "Error fetching media", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
	fmt.Println(json.NewEncoder(w).Encode(movies))
}

func (c *MovieController) FindMovie(w http.ResponseWriter, r *http.Request) {
	movieName := r.URL.Query().Get("movietitle")
	movies, err := c.movieService.FindMovie(movieName)

	if err != nil {
		http.Error(w, "Error fetching media", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
	fmt.Println(json.NewEncoder(w).Encode(movies))
}
