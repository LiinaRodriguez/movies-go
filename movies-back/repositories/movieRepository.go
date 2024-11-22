package repositories

import (
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type MovieRepository interface {
	GetFavoriteMovies(userID int) ([]models.Favorites, error)
	AddFavoriteMovie(userID int, movieID string) error
	RemoveFavoriteMovie(userID int, movieID string) error
	RateMovie(userID int, movie string, rating int) error
	RemoveRating(userID int, movieID string) error
	GetRatedMoviesByUserIdWithPagination(userid int, limit int, offset int) ([]models.Rating, error)
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

func (r *movieRepository) RemoveFavoriteMovie(userID int, movieID string) error {
	result := r.db.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Favorites{})
	return result.Error
}

func (r *movieRepository) RateMovie(userID int, movieID string, rating int) error {
	ratingEntry := models.Rating{UserId: userID, MovieId: movieID, Rating: float64(rating)}
	return r.db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}, {Name: "movie_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"rating"}),
	}).Create(&ratingEntry).Error
}

func (r *movieRepository) RemoveRating(userID int, movieID string) error {
	result := r.db.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Rating{})
	return result.Error
}

func (r *movieRepository) GetRatedMoviesByUserIdWithPagination(userid int, limit int, offset int) ([]models.Rating, error) {
	var ratings []models.Rating
	result := r.db.Where("user_id = ?", userid).Limit(limit).Offset(offset).Find(&ratings)
	return ratings, result.Error
}
