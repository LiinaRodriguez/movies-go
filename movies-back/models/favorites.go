package models

import "gorm.io/gorm"

type Favorites struct {
	gorm.Model
	ID      int    `json:"id" gorm:"primaryKey" gorm:"autoIncrement" gorm:"not null" gorm:"unique"`
	UserID  int    `json:"user_id"`
	MovieID string `json:"movie_id"`
}
