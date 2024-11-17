package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID           int    `json:"id" gorm:"primaryKey" gorm:"autoIncrement" gorm:"not null" gorm:"unique"`
	Name         string `json:"name"`
	Email        string `json:"email" gorm:"unique"`
	Password     string `json:"password"`
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
}
