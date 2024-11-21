package machinelearning

import (
	"bufio"
	"fmt"
	"github.com/liinarodriguez/movies-go/movies-back/config"
	"github.com/liinarodriguez/movies-go/movies-back/models"
	"os"
	"strconv"
	"strings"
	"sync"
)

type RatingTag struct {
	UserId  int
	MovieId string
	Rating  float64
	Tag     string
}

var (
	trainOnce sync.Once
)

const batchSize = 1000

func GetCombinedDataOnce() ([]RatingTag, error) {
	once.Do(func() {
		var err error
		combinedDataCache, err = GetCombinedData()
		if err != nil {
			combinedDataCache = nil
		}
	})
	if combinedDataCache == nil {
		return nil, fmt.Errorf("error fetching combined data")
	}
	return combinedDataCache, nil
}

func GetCombinedData() ([]RatingTag, error) {
	var combinedData []RatingTag
	var wg sync.WaitGroup
	ratingsChan := make(chan []models.Rating, 10)
	tagsChan := make(chan []models.Tag, 10)
	errChan := make(chan error, 2)

	wg.Add(2)

	go func() {
		defer wg.Done()
		fmt.Println("Starting ratings query...")
		ratings, err := GetRatingsInBatches()
		if err != nil {
			errChan <- err
			return
		}
		fmt.Printf("Ratings thread received %d records.\n", len(ratings))
		ratingsChan <- ratings
	}()

	go func() {
		defer wg.Done()
		fmt.Println("Starting tags query...")
		tags, err := GetTagsInBatches()
		if err != nil {
			errChan <- err
			return
		}
		fmt.Printf("Tags thread received %d records.\n", len(tags))
		tagsChan <- tags
	}()

	wg.Wait()

	select {
	case err := <-errChan:
		return nil, err
	default:
	}

	ratings := <-ratingsChan
	tags := <-tagsChan

	tagMap := make(map[string]string)
	for _, t := range tags {
		tagKey := fmt.Sprintf("%d_%s", t.UserId, t.MovieId)
		tagMap[tagKey] = t.Tag
	}

	combinedData = make([]RatingTag, 0, len(ratings))
	for _, r := range ratings {
		tagKey := fmt.Sprintf("%d_%s", r.UserId, r.MovieId)
		tag, exists := tagMap[tagKey]
		if !exists {
			continue
		}
		combinedData = append(combinedData, RatingTag{
			UserId:  r.UserId,
			MovieId: r.MovieId,
			Rating:  r.Rating,
			Tag:     tag,
		})
	}

	fmt.Println("Successfully processed combined data.", len(combinedData))
	return combinedData, nil
}

func GetRatingsInBatches() ([]models.Rating, error) {
	var allRatings []models.Rating
	offset := 0

	for {
		var batch []models.Rating
		err := config.DB.Offset(offset).Limit(batchSize).Find(&batch).Error
		if err != nil {
			return nil, fmt.Errorf("error fetching ratings: %w", err)
		}

		if len(batch) == 0 {
			break
		}

		allRatings = append(allRatings, batch...)

		offset += batchSize
	}

	return allRatings, nil
}

func GetTagsInBatches() ([]models.Tag, error) {
	var allTags []models.Tag
	var batch []models.Tag
	offset := 0

	for {
		if err := config.DB.Offset(offset).Limit(batchSize).Find(&batch).Error; err != nil {
			return nil, fmt.Errorf("error fetching tags: %w", err)
		}
		if len(batch) == 0 {
			break
		}

		allTags = append(allTags, batch...)
		offset += batchSize
	}

	return allTags, nil
}

func CreateTagCorpus() ([][]string, error) {
	uniqueTags := models.GetUniqueTagsFromDB()
	if uniqueTags == nil {
		return nil, fmt.Errorf("error fetching unique tags from database")
	}

	var tagCorpus [][]string
	for _, tag := range uniqueTags {
		tagCorpus = append(tagCorpus, []string{tag})
	}

	return tagCorpus, nil
}

func loadWordVectors() (map[string][]float64, error) {

	trainOnce.Do(func() {
		if _, err := os.Stat("data/word_vectors.txt"); os.IsNotExist(err) {
			fmt.Println("Vector file does not exist, training Word2Vec model...")
			if err := TrainWord2Vec(); err != nil {
				fmt.Printf("Error training Word2Vec: %v\n", err)
			}
		}
	})

	file, err := os.Open("data/word_vectors.txt")
	if err != nil {
		return nil, fmt.Errorf("could not open vector file: %v", err)
	}
	defer file.Close()

	vectors := make(map[string][]float64)
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)

		if len(fields) < 2 {
			continue
		}

		word := fields[0]
		var vector []float64
		for _, val := range fields[1:] {
			num, err := strconv.ParseFloat(val, 64)
			if err != nil {
				return nil, fmt.Errorf("error parsing vector: %v", err)
			}
			vector = append(vector, num)
		}
		vectors[word] = vector
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("error reading file: %v", err)
	}

	return vectors, nil
}

func GetMovies() (map[string]models.Movie, error) {
	var movies []models.Movie
	movieMap := make(map[string]models.Movie)

	if err := config.DB.Find(&movies).Error; err != nil {
		return nil, fmt.Errorf("error loading movies: %w", err)
	}

	for _, movie := range movies {
		movieMap[movie.MovieId] = movie
	}
	return movieMap, nil
}
