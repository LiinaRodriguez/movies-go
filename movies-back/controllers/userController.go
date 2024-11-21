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

func (c *MovieController) GetRecommendations(w http.ResponseWriter, r *http.Request) {
	//recibir id de usuario
	//llamar al metodo  RecommendFromMatrix(userId),el metodo retorna un arreglo de string con los Id de las peliculas
	//llamar a la otra api para recibir la informacion completa de cada pelicula
	//retornar la informacion obtenida de la otra api
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
