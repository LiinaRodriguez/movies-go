package config

import (
	"github.com/liinarodriguez/movies-go/movies-back/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func ConnectDatabase() {
	db := utils.GetEnv("DB")
	database, err := gorm.Open(postgres.Open(db), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectar la base de datos:", err)
	}

	DB = database
}
