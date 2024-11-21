package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"net/http"
)

type MovieController struct {
	movieService services.MovieService
	tmdbCLient   api.TmdbClient
}

func NewMovieController(movieService services.MovieService, tmdbClient api.TmdbClient) *MovieController {
	return &MovieController{movieService, tmdbClient}
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

func (c *MovieController) GetRecommendations(w http.ResponseWriter, r *http.Request) {
	//recibir id de usuario
	//llamar al metodo  RecommendFromMatrix(userId),el metodo retorna un arreglo de string con los Id de las peliculas
	//llamar a la otra api para recibir la informacion completa de cada pelicula
	//retornar la informacion obtenida de la otra api
}
