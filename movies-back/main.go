package main

import (
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/controllers"
	"github.com/liinarodriguez/movies-go/movies-back/middleware"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
	"github.com/liinarodriguez/movies-go/movies-back/services"
)

func main() {

	// Conectar la base de datos
	config.ConnectDatabase()

	//Migrate
	err := config.DB.AutoMigrate(&models.User{})
	if err != nil {
		fmt.Println("Error al migrar:", err)
	} else {
		fmt.Println("Tablas creadas correctamente (si no existían).")
	}

	// Configurar repositorio, servicio y controlador de autenticación
	userRepo := repositories.NewUserRepository()
	authService := services.NewAuthService(userRepo)
	authController := controllers.NewAuthController(authService)

	// Configurar el router
	router := mux.NewRouter()
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // frontend React
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Añadir CORS como middleware al router
	handler := c.Handler(router)

	// Rutas de autenticación
	router.HandleFunc("/register", authController.Register).Methods("POST")
	router.HandleFunc("/login", authController.Login).Methods("POST")

	// Ruta protegida
	protected := router.PathPrefix("/protected").Subrouter()
	protected.Use(middleware.AuthMiddleware)
	protected.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Este es un endpoint protegido"))
	}).Methods("GET")

	router.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		path, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()
		fmt.Println("Ruta:", path, "Métodos:", methods)
		return nil
	})

	// Iniciar el servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	fmt.Println("Servidor iniciado en http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
