package models

type Rating struct {
	UserId  int     `gorm:"primaryKey;not null"`
	MovieId string  `gorm:"primaryKey;not null"`
	Rating  float64 `gorm:"not null"`
}
