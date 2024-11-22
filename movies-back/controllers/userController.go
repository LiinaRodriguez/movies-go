package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"net/http"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(userService services.UserService) *UserController {
	return &UserController{userService}
}

func (c *UserController) GetRatedMovies(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID   int `json:"user_id"`
		Page     int `json:"page"`
		PageSize int `json:"page_size"`
	}

	var request Request
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	// Validar y asignar valores predeterminados
	if request.Page <= 0 {
		request.Page = 1
	}
	if request.PageSize <= 0 || request.PageSize > 100 {
		request.PageSize = 10
	}

	movies, err := c.userService.GetRatedMoviesByUserId(request.UserID, request.Page, request.PageSize)
	if err != nil {
		http.Error(w, "Error fetching rated movies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(movies); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func (c *UserController) GetRecommendations(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID int `json:"user_id"` // Nota: "UserID" comienza con mayúscula para que sea exportado
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var request Request
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	if request.UserID <= 0 {
		http.Error(w, "Invalid UserID", http.StatusBadRequest)
		return
	}

	movies, err := c.userService.RecommendFromTheMatrix(request.UserID)

	if err != nil {
		http.Error(w, "Error fetching favorites", http.StatusInternalServerError)
		return
	}
	response := map[string]interface{}{
		"data": movies,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
	fmt.Println("Response sent successfully.")
}

func (c *UserController) GetFavorites(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID int `json:"user_id"` // Nota: "UserID" comienza con mayúscula para que sea exportado
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var request Request
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	if request.UserID <= 0 {
		http.Error(w, "Invalid UserID", http.StatusBadRequest)
		return
	}

	fmt.Printf("Controller: UserID = %d\n", request.UserID)

	movies, err := c.userService.GetFavorites(request.UserID)
	if err != nil {
		http.Error(w, "Error fetching favorites", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(movies); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
	fmt.Println("Response sent successfully.")
}
