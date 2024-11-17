package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/routes"
	"github.com/rs/cors"
)

func main() {
	// Configurar la base de datos
	config.ConnectDatabase()

	// Configurar el router
	router := mux.NewRouter()

	// Registrar las rutas
	routes.RegisterRoutes(router)

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	// Iniciar el servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	fmt.Println("Servidor iniciado en http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
