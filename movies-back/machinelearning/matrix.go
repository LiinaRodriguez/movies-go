package machinelearning

import (
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/utils"
	"math/rand"
	"sort"
	"time"
)

func CreateUserMovieMatrix() (map[int]int, map[string]int, [][]float64, error) {

	var ratings []struct {
		UserId  int     `json:"user_id"`
		MovieId string  `json:"movie_id"`
		Rating  float64 `json:"rating"`
	}

	err := config.DB.Raw("SELECT user_id, movie_id, rating FROM ratings ORDER BY user_id, movie_id").Scan(&ratings).Error
	if err != nil {
		return nil, nil, nil, err
	}

	userIndex := make(map[int]int)
	movieIndex := make(map[string]int)
	var matrix [][]float64

	for _, rating := range ratings {
		if _, exists := userIndex[rating.UserId]; !exists {
			userIndex[rating.UserId] = len(userIndex)
		}

		if _, exists := movieIndex[rating.MovieId]; !exists {
			movieIndex[rating.MovieId] = len(movieIndex)
		}
	}

	matrix = make([][]float64, len(userIndex))
	for i := range matrix {
		matrix[i] = make([]float64, len(movieIndex))
	}

	for _, rating := range ratings {
		userIdx := userIndex[rating.UserId]
		movieIdx := movieIndex[rating.MovieId]
		matrix[userIdx][movieIdx] = rating.Rating
	}

	return userIndex, movieIndex, matrix, nil
}

func getTopUnseenMovies(userId int) ([]string, error) {
	var unseenMovies []string
	err := config.DB.Raw(`
		SELECT movie_id 
		FROM movies 
		WHERE movie_id NOT IN (
			SELECT movie_id FROM ratings WHERE user_id = ?
		)`, userId).Scan(&unseenMovies).Error
	if err != nil {
		return nil, fmt.Errorf("error fetching unseen movies: %w", err)
	}
	return unseenMovies, nil
}

func RecommendFromMatrix(userId int) ([]string, error) {

	userIndex, movieIndex, matrix, err := CreateUserMovieMatrix()
	if err != nil {
		return nil, err
	}
	userIdx, userExists := userIndex[userId]
	if !userExists {
		return nil, fmt.Errorf("user %d not found", userId)
	}

	similarities := make([]float64, len(matrix))
	for otherIdx, otherRatings := range matrix {
		if otherIdx != userIdx {
			similarities[otherIdx] = utils.CosineSimilarity(matrix[userIdx], otherRatings)
		}
	}

	topK := GetTopKNeighbors(similarities, 36)

	predictedRatings := make([]float64, len(matrix[0]))
	for _, neighborIdx := range topK {
		for movieIdx, rating := range matrix[neighborIdx] {
			predictedRatings[movieIdx] += rating
		}
	}

	unseenMovies, err := getTopUnseenMovies(userId)
	if err != nil {
		return nil, err
	}

	movieRatings := make([]struct {
		MovieID string
		Rating  float64
	}, 0)

	for _, movieId := range unseenMovies {
		movieIdx := movieIndex[movieId]
		if predictedRatings[movieIdx] > 0 {
			movieRatings = append(movieRatings, struct {
				MovieID string
				Rating  float64
			}{
				MovieID: movieId,
				Rating:  predictedRatings[movieIdx],
			})
		}
	}

	sort.Slice(movieRatings, func(i, j int) bool {
		return movieRatings[i].Rating > movieRatings[j].Rating
	})

	recommendations := []string{}
	for i, movie := range movieRatings {
		if i >= 10 {
			break
		}
		recommendations = append(recommendations, movie.MovieID)
		fmt.Println(movieRatings[i].Rating)
	}
	return recommendations, nil
}

func GetTopKNeighbors(similarities []float64, k int) []int {
	type pair struct {
		index int
		value float64
	}
	pairs := make([]pair, len(similarities))
	for i, v := range similarities {
		pairs[i] = pair{index: i, value: v}
	}

	sort.Slice(pairs, func(i, j int) bool {
		return pairs[i].value > pairs[j].value
	})

	topK := make([]int, 0, k)
	for i := 0; i < k && i < len(pairs); i++ {
		if pairs[i].value > 0 {
			topK = append(topK, pairs[i].index)
		}
	}

	return topK
}

func GetRandomRecommendationsByRating(minRating float64) ([]string, error) {
	// Get movies with good ratings
	goodMovies, err := GetMoviesWithGoodRatings(minRating)
	if err != nil {
		return nil, err
	}

	// Initialize random number generator
	rand.Seed(time.Now().UnixNano())

	// Randomly select 'k' movies from the list of good movies
	recommendations := make([]string, 10)
	for i := 0; i < 10; i++ {
		randomIndex := rand.Intn(len(goodMovies)) // Select a random index
		recommendations[i] = goodMovies[randomIndex]
	}

	return recommendations, nil
}

func GetMoviesWithGoodRatings(minRating float64) ([]string, error) {
	// Query the ratings for all movies
	var ratings []struct {
		MovieId string  `json:"movie_id"`
		Rating  float64 `json:"rating"`
	}

	// Execute the SQL query with GORM
	err := config.DB.Raw("SELECT movie_id, rating FROM ratings").Scan(&ratings).Error
	if err != nil {
		return nil, err
	}

	// Map to store ratings for each movie
	movieRatings := make(map[string][]float64)

	// Accumulate ratings for each movie
	for _, rating := range ratings {
		movieRatings[rating.MovieId] = append(movieRatings[rating.MovieId], rating.Rating)
	}

	// Calculate average ratings for the movies
	var goodMovies []string
	for movieId, ratings := range movieRatings {
		// Calculate the average rating
		var total float64
		for _, rating := range ratings {
			total += rating
		}
		averageRating := total / float64(len(ratings))

		// Only include movies with an average rating above the threshold
		if averageRating >= minRating {
			goodMovies = append(goodMovies, movieId)
		}
	}

	return goodMovies, nil
}

func GetMovieTitles(recommendations []string) []string {
	var titles []string
	err := config.DB.Raw("SELECT title FROM movies WHERE movie_id IN (?)", recommendations).Pluck("title", &titles).Error
	if err != nil {
		return []string{}
	}
	return titles
}
