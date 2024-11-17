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
