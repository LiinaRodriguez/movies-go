package services

import (
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/machinelearning"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
)

type UserService interface {
	GetFavorites(userid int) ([]api.Media, error)
	RecommendFromTheMatrix(userid int) ([]api.Media, error)
	GetRatedMoviesByUserId(userid int, page int, pageSize int) ([]api.Media, error)
}

type userService struct {
	userRepo     repositories.UserRepository
	movieService MovieService
}

func NewUserService(userRepo repositories.UserRepository, movieService MovieService) *userService {
	return &userService{userRepo, movieService}
}

func (s *userService) GetFavorites(userid int) ([]api.Media, error) {

	favorites, err := s.userRepo.FindFavoritesByUserId(userid)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var favoritesmedia []api.Media

	for _, favorite := range favorites {
		media, err := s.movieService.GetMovieById(favorite.MovieID)
		if err != nil {
			fmt.Printf("Error fetching movie with ID %s: %v\n", favorite.MovieID, err)
			continue
		}
		favoritesmedia = append(favoritesmedia, media)
	}
	return favoritesmedia, nil
}

func (s *userService) RecommendFromTheMatrix(userid int) ([]api.Media, error) {
	recommendations, err := machinelearning.RecommendFromMatrix(userid)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var favoritesmedia []api.Media

	for _, movieId := range recommendations {
		media, err := s.movieService.GetMovieById(movieId)
		if err != nil {
			fmt.Printf("Error fetching movie with ID %s: %v\n", movieId, err)
			continue
		}
		favoritesmedia = append(favoritesmedia, media)
	}

	return favoritesmedia, nil
}
func (s *userService) GetRatedMoviesByUserId(userid int, page int, pageSize int) ([]api.Media, error) {
	// Calcular offset
	offset := (page - 1) * pageSize

	// Llamar al repositorio con paginación
	ratedmovies, err := s.userRepo.GetRatedMoviesByUserIdWithPagination(userid, pageSize, offset)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var moviesmedia []api.Media
	for _, ratedmovie := range ratedmovies {
		// Obtener los detalles de la película por su ID
		media, err := s.movieService.GetMovieById(ratedmovie.MovieId)
		if err != nil {
			fmt.Printf("Error fetching movie with ID %s: %v\n", ratedmovie.MovieId, err)
			continue
		}

		// Reemplazar el campo Rating con la calificación del usuario
		media.Rating = ratedmovie.Rating * 2
		moviesmedia = append(moviesmedia, media)
	}

	return moviesmedia, nil
}
