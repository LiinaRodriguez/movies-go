package services

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"github.com/liinarodriguez/movies-go/movies-back/repositories"
	"golang.org/x/crypto/bcrypt"
	"time"
)

var jwtKey = []byte("secret_key")

type AuthService interface {
	Login(username, password string) (*models.User, error)
	Register(user *models.User) error
}

type authService struct {
	userRepository repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
	return &authService{userRepository: userRepo}
}

func (s *authService) Login(username, password string) (*models.User, error) {
	user, err := s.userRepository.FindByEmail(username)
	if err != nil {
		return user, errors.New("usuario no encontrado")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return user, errors.New("contraseña incorrecta")
	}

	expirationTime := time.Now().Add(20 * time.Minute)
	claims := &jwt.RegisteredClaims{
		Subject:   user.Email,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	user.Token, _ = token.SignedString(jwtKey)
	return user, nil
}

func (s *authService) Register(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	return s.userRepository.CreateUser(user)
}
