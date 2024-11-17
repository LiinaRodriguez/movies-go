package repositories

import (
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindByEmail(email string) (*models.User, error)
	CreateUser(user *models.User) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	result := r.db.Where("email = ?", email).First(&user)
	return &user, result.Error
}

func (r *userRepository) CreateUser(user *models.User) error {
	return r.db.Create(user).Error
}
