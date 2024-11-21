package models

import (
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"log"
)

type Tag struct {
	ID      int    `gorm:"primaryKey;autoIncrement"`
	UserId  int    `gorm:"not null"`
	MovieId string `gorm:"not null"`
	Tag     string `gorm:"not null"`
}

// Function to get unique tags from the database
func GetUniqueTagsFromDB() []string {
	var uniqueTags []string

	err := config.DB.
		Model(&Tag{}).
		Distinct("tag").
		Where("tag != ?", "").
		Pluck("tag", &uniqueTags).Error

	if err != nil {
		log.Printf("Error getting unique tags: %v\n", err)
		return nil
	}
	return uniqueTags
}
