package repositories

import (
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"gorm.io/gorm"
)

type MovieRepository interface {
	GetFavoriteMovies(userID int) ([]models.Favorites, error)
	AddFavoriteMovie(userID int, movieID string) error
	RateMovie(userID int, movie string, rating int) error
}
type movieRepository struct {
	db *gorm.DB
}

func NewMovieRepository(db *gorm.DB) MovieRepository {
	return &movieRepository{db}
}

func (r *movieRepository) GetFavoriteMovies(userID int) ([]models.Favorites, error) {
	var favorites []models.Favorites
	result := r.db.Where("user_id = ?", userID).Find(&favorites)
	return favorites, result.Error
}

func (r *movieRepository) AddFavoriteMovie(userID int, movieID string) error {
	favorite := models.Favorites{UserID: userID, MovieID: movieID}
	return r.db.Create(&favorite).Error
}

func (r *movieRepository) RateMovie(userID int, movieID string, rating int) error {
	ratingEntry := models.Ratings{UserID: userID, MovieID: movieID, Rating: rating}
	return r.db.Create(&ratingEntry).Error
}
