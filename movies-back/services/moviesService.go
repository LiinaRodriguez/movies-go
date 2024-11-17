package services

import (
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
)

type MovieService interface {
	GetMedia(mediaType string) ([]api.TmdbMedia, error)
	//GetRecommendedMovies(userID uint) ([]models.Movies, error)
	//GetMovieDetails(movieID string) (models.Movies, error)
}

type movieService struct {
	movieRepo  repositories.MovieRepository
	omdbClient api.OmdbClient
	tmdbClient api.TmdbClient
}

func NewMovieService(movieRepo repositories.MovieRepository, omdbClient api.OmdbClient, tmdbClient api.TmdbClient) MovieService {
	return &movieService{movieRepo, omdbClient, tmdbClient}
}

func (s *movieService) GetMedia(mediaType string) ([]api.TmdbMedia, error) {
	return s.tmdbClient.FetchMedia(mediaType)
}
