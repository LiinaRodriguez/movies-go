package controllers

import (
	"encoding/json"
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"github.com/liinarodriguez/movies-go/movies-back/services"
	"log"
	"net/http"
	"strconv"
)

type AuthController struct {
	authService services.AuthService
}

func NewAuthController(authService services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

func (c *AuthController) Login(w http.ResponseWriter, r *http.Request) {
	var creds models.User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := c.authService.Login(creds.Email, creds.Password)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}
	response := map[string]interface{}{
		"data": map[string]string{
			"token":   user.Token,
			"user":    user.Email,
			"user_id": strconv.Itoa(user.ID),
		},
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (c *AuthController) Register(w http.ResponseWriter, r *http.Request) {
	log.Println(`Recibiendo solicitud de registro`)
	var user models.User
	log.Println("Recibiendo solicitud de registro")
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error al decodificar el usuario: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := c.authService.Register(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	log.Println("Recibiendo solicitud de registro")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Usuario registrado con éxito"))
}
