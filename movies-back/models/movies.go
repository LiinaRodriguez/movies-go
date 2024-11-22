package models

type Movie struct {
	MovieId string `gorm:"primaryKey"`
	Title   string `gorm:"size:255"`
	Genres  string `gorm:"size:255"`
}
