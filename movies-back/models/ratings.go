package models

import "gorm.io/gorm"

type Ratings struct {
	gorm.Model
	ID      int    `json:"id" gorm:"primaryKey" gorm:"autoIncrement" gorm:"not null" gorm:"unique"`
	UserID  int    `json:"user_id"`
	MovieID string `json:"movie_id"`
	Rating  int    `json:"rating"`
}

type Rating struct {
	UserId  int     `gorm:"primaryKey;not null"`
	MovieId string  `gorm:"primaryKey;not null"`
	Rating  float64 `gorm:"not null"`
}
