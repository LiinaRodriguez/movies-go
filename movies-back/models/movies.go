package models

import (
	"gorm.io/gorm"
)

type Movies struct {
	gorm.Model
	ID          int      `json:"id" gorm:"primaryKey" gorm:"autoIncrement" gorm:"not null" gorm:"unique"`
	Title       string   `json:"title"`
	Year        int      `json:"year"`
	Genre       []string `json:"genre"`
	Rating      int      `json:"rating"`
	Poster      string   `json:"poster"`
	Description string   `json:"description"`
}

type Movie struct {
	MovieId string `gorm:"primaryKey"`
	Title   string `gorm:"size:255"`
	Genres  string `gorm:"size:255"`
}
