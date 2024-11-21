package services

import (
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/api"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
)

type UserService interface {
	GetFavorites(userid int) ([]api.Media, error)
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
