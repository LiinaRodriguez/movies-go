package routes

import (
	"github.com/gorilla/mux"
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/controllers"
	"github.com/liinarodriguez/movies-go/movies-back/middleware"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"github.com/liinarodriguez/movies-go/movies-back/utils"
	"net/http"
)

func RegisterRoutes(router *mux.Router) {
	apiKey_tmdb := utils.GetEnv("TMDB_API_KEY")
	apiKey_omdb := utils.GetEnv("OMDB_API_KEY")
	omdbClient := api.NewOmdbClient(apiKey_omdb)
	tmdbClient := api.NewTmdbClient(apiKey_tmdb, omdbClient)
	movieService := services.NewMovieService(repositories.NewMovieRepository(config.DB), *omdbClient, tmdbClient)
	userService := services.NewUserService(repositories.NewUserRepository(config.DB), movieService)

	movieController := controllers.NewMovieController(movieService)
	userController := controllers.NewUserController(userService)
	userRepo := repositories.NewUserRepository(config.DB)
	authService := services.NewAuthService(userRepo)
	authController := controllers.NewAuthController(authService)

	// Ruta para obtener todas las peliculas
	router.HandleFunc("/movies", movieController.GetMedia).Methods("GET")
	router.HandleFunc("/find", movieController.FindMovie).Methods("GET")
	router.HandleFunc("/foryou", userController.GetRecommendations).Methods("POST")
	router.HandleFunc("/favorites", userController.GetFavorites).Methods("POST")
	router.HandleFunc("/rated", userController.GetRatedMovies).Methods("POST")

	// Rutas para agregar o eliminar peliculas de favoritos
	router.HandleFunc("/favorites/add", userController.AddFavoriteMovie).Methods("POST")
	router.HandleFunc("/favorites/remove", userController.RemoveFavoriteMovie).Methods("POST")

	// Ruta para calificar una pelicula
	router.HandleFunc("/rate", userController.RateMovie).Methods("POST")

	// Ruta para eliminar una calificacion de película
	router.HandleFunc("/rate/remove", userController.RemoveRating).Methods("POST")

	// Rutas de autenticacion
	router.HandleFunc("/register", authController.Register).Methods("POST")
	router.HandleFunc("/login", authController.Login).Methods("POST")

	// Rutas protegidas
	protected := router.PathPrefix("/protected").Subrouter()
	protected.Use(middleware.AuthMiddleware)
	protected.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Este es un endpoint protegido"))
	}).Methods("GET")
}
