package machinelearning

import (
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/utils"
	"strings"
	"sync"
)

var (
	combinedDataCache []RatingTag
	once              sync.Once
)

func FindMoviesByWordEmbedding(tag string) []string {
	movieMap, err := GetMovies()
	if err != nil {
		fmt.Printf("Error loading movie map: %v\n", err)
		return nil
	}

	vectors, err := loadWordVectors()
	if err != nil {
		fmt.Printf("Error loading word vectors: %v\n", err)
		return nil
	}

	words := strings.Fields(tag)
	var combinedVector []float64
	for _, word := range words {
		wordVector, exists := vectors[word]
		if !exists {
			fmt.Printf("The word '%s' does not have an associated vector.\n", word)
			continue
		}
		if combinedVector == nil {
			combinedVector = make([]float64, len(wordVector))
		}
		for i, value := range wordVector {
			combinedVector[i] += value
		}
	}
	if combinedVector == nil {
		fmt.Printf("No valid vectors found for the tag '%s'.\n", tag)
		return nil
	}

	for i := range combinedVector {
		combinedVector[i] /= float64(len(words))
	}

	movieEmbeddings, err := CreateMovieTagEmbeddings()
	if err != nil {
		fmt.Printf("Error creating movie embeddings: %v\n", err)
		return nil
	}

	var similarities []float64
	var movieIds []string
	for movieId, movieVector := range movieEmbeddings {

		similarity := utils.CosineSimilarity(combinedVector, movieVector)
		similarities = append(similarities, similarity)
		movieIds = append(movieIds, movieId)
	}

	topKIndices := GetTopKNeighbors(similarities, 36)

	var relatedMovieIds []string
	for _, idx := range topKIndices {
		movieId := movieIds[idx]
		if _, exists := movieMap[movieId]; exists {
			relatedMovieIds = append(relatedMovieIds, movieId)
		}
	}

	return relatedMovieIds[:10]
}

func CreateMovieTagEmbeddings() (map[string][]float64, error) {
	combinedData, err := GetCombinedDataOnce()
	if err != nil {
		return nil, fmt.Errorf("error getting combined data: %w", err)
	}

	movieVectors := make(map[string][]float64)
	for _, data := range combinedData {
		tag := data.Tag
		vector, err := GetAverageTagVector([]string{tag})
		if err == nil {
			movieVectors[data.MovieId] = vector
		}
	}

	return movieVectors, nil
}

func GetAverageTagVector(tags []string) ([]float64, error) {
	vectors, err := loadWordVectors()
	if err != nil {
		return nil, fmt.Errorf("error loading vectors: %w", err)
	}

	var vector []float64
	var count int

	for _, tag := range tags {
		vec, exists := vectors[tag]
		if !exists {
			continue
		}

		if vector == nil {
			vector = make([]float64, len(vec))
		}

		for i := range vec {
			vector[i] += vec[i]
		}
		count++
	}

	if count == 0 {
		return nil, fmt.Errorf("no vectors found for tags")
	}

	for i := range vector {
		vector[i] /= float64(count)
	}

	return vector, nil
}
