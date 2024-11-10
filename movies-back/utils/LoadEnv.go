package utils

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func GetEnv(key string) string {
	loadFile()
	env := os.Getenv(key)
	if env == "" {
		log.Fatalf("La variable de entorno %s no está definida", key)
	}
	return env
}

func loadFile() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando el archivo .env")
	}
}
