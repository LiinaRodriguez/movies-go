package routes

import (
	"github.com/gorilla/mux"
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/controllers"
	"github.com/liinarodriguez/movies-go/movies-back/middleware"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"net/http"
)

func RegisterRoutes(router *mux.Router) {
	apiKey_tmdb := "6eb8b63cd876fdf9e24de7e09b72b008"
	apiKey_omdb := "b9b3d7b7"
	omdbClient := api.NewOmdbClient(apiKey_omdb)
	tmdbClient := api.NewTmdbClient(apiKey_tmdb, omdbClient)
	movieService := services.NewMovieService(repositories.NewMovieRepository(config.DB), omdbClient, tmdbClient)
	movieController := controllers.NewMovieController(movieService, tmdbClient)

	userRepo := repositories.NewUserRepository(config.DB)
	authService := services.NewAuthService(userRepo)
	authController := controllers.NewAuthController(authService)

	// Ruta para obtener todas las películas
	router.HandleFunc("/movies", movieController.GetMedia).Methods("GET")

	// Rutas de autenticación
	router.HandleFunc("/register", authController.Register).Methods("POST")
	router.HandleFunc("/login", authController.Login).Methods("POST")

	// Rutas protegidas
	protected := router.PathPrefix("/protected").Subrouter()
	protected.Use(middleware.AuthMiddleware)
	protected.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Este es un endpoint protegido"))
	}).Methods("GET")
}
