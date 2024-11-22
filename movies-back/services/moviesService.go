package services

import (
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
)

type MovieService interface {
	GetMedia(mediaType string) ([]api.Media, error)
	FindMovie(name string) ([]api.Media, error)
	GetFavoriteMovies(userID int) ([]models.Favorites, error)
	GetMovieById(movieid string) (api.Media, error)
	RemoveFavoriteMovie(userID int, movieID string) error
	RemoveRating(userID int, movieID string) error
	GetRatedMoviesByUserIdWithPagination(userid int, limit int, offset int) ([]models.Rating, error)
	AddFavoriteMovie(userid int, id string) error
	RateMovie(userID int, movieID string, rating int) error
}

type movieService struct {
	movieRepo  repositories.MovieRepository
	omdbClient api.OmdbClient
	tmdbClient api.TmdbClient
}

func NewMovieService(movieRepo repositories.MovieRepository, omdbClient api.OmdbClient, tmdbClient api.TmdbClient) *movieService {
	return &movieService{movieRepo, omdbClient, tmdbClient}
}
func (s *movieService) GetMedia(mediaType string) ([]api.Media, error) {
	return s.tmdbClient.FetchMedia(mediaType)
}

func (s *movieService) FindMovie(name string) ([]api.Media, error) {
	return s.tmdbClient.FindMovie(name)
}
func (s *movieService) GetFavoriteMovies(userID int) ([]models.Favorites, error) {
	return s.movieRepo.GetFavoriteMovies(userID)
}

func (s *movieService) GetMovieById(movieid string) (api.Media, error) {
	return s.tmdbClient.FindMovieById(movieid)
}

func (s *movieService) RemoveFavoriteMovie(userID int, movieID string) error {
	return s.movieRepo.RemoveFavoriteMovie(userID, movieID)
}

func (s *movieService) RemoveRating(userID int, movieID string) error {
	return s.movieRepo.RemoveRating(userID, movieID)
}

func (s *movieService) AddFavoriteMovie(userID int, movieID string) error {
	return s.movieRepo.AddFavoriteMovie(userID, movieID)
}

func (s *movieService) RateMovie(userID int, movieID string, rating int) error {
	return s.movieRepo.RateMovie(userID, movieID, rating)
}

func (s *movieService) GetRatedMoviesByUserIdWithPagination(userid int, limit int, offset int) ([]models.Rating, error) {
	return s.movieRepo.GetRatedMoviesByUserIdWithPagination(userid, limit, offset)
}
