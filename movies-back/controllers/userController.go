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
		UserID int `json:"user_id"`
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
		UserID int `json:"user_id"`
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

func (c *UserController) AddFavoriteMovie(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID  int    `json:"user_id"`
		MovieID string `json:"movie_id"`
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

	if request.UserID <= 0 || request.MovieID == "" {
		http.Error(w, "Invalid UserID or MovieID", http.StatusBadRequest)
		return
	}

	err = c.userService.AddFavoriteMovie(request.UserID, request.MovieID)
	if err != nil {
		http.Error(w, "Error adding favorite movie", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Movie %s added to favorites for UserID %d", request.MovieID, request.UserID)
}

func (c *UserController) RemoveFavoriteMovie(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID  int    `json:"user_id"`
		MovieID string `json:"movie_id"`
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

	if request.UserID <= 0 || request.MovieID == "" {
		http.Error(w, "Invalid UserID or MovieID", http.StatusBadRequest)
		return
	}

	err = c.userService.RemoveFavoriteMovie(request.UserID, request.MovieID)
	if err != nil {
		http.Error(w, "Error removing favorite movie", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Movie %s removed from favorites for UserID %d", request.MovieID, request.UserID)
}

func (c *UserController) RateMovie(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID  int    `json:"user_id"`
		MovieID string `json:"movie_id"`
		Rating  int    `json:"rating"`
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

	if request.UserID <= 0 || request.MovieID == "" || request.Rating < 1 || request.Rating > 10 {
		http.Error(w, "Invalid UserID, MovieID or Rating", http.StatusBadRequest)
		return
	}

	err = c.userService.RateMovie(request.UserID, request.MovieID, request.Rating)
	if err != nil {
		http.Error(w, "Error rating movie", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Movie %s rated %d by UserID %d", request.MovieID, request.Rating, request.UserID)
}

func (c *UserController) RemoveRating(w http.ResponseWriter, r *http.Request) {
	type Request struct {
		UserID  int    `json:"user_id"`
		MovieID string `json:"movie_id"`
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

	if request.UserID <= 0 || request.MovieID == "" {
		http.Error(w, "Invalid UserID or MovieID", http.StatusBadRequest)
		return
	}

	err = c.userService.RemoveRating(request.UserID, request.MovieID)
	if err != nil {
		http.Error(w, "Error removing rating", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Rating removed for Movie %s by UserID %d", request.MovieID, request.UserID)
}
