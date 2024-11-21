package machinelearning

import (
	"fmt"
	"github.com/ynqa/wego/pkg/model/word2vec"
	"os"
	"strings"
)

func TrainWord2Vec() error {
	tagCorpus, err := CreateTagCorpus()
	if err != nil {
		return fmt.Errorf("error creating tag corpus: %w", err)
	}

	model, err := word2vec.New(
		word2vec.Window(5),
		word2vec.Model(word2vec.Cbow),
		word2vec.Optimizer(word2vec.NegativeSampling),
		word2vec.NegativeSampleSize(5),
		word2vec.Verbose(),
	)
	if err != nil {
		return fmt.Errorf("error creating Word2Vec model: %w", err)
	}

	corpusReader := strings.NewReader(joinCorpus(tagCorpus))

	// Train the model
	if err := model.Train(corpusReader); err != nil {
		return fmt.Errorf("error training Word2Vec model: %w", err)
	}

	// Save the trained model
	outFile, err := os.Create("data/word_vectors.txt")
	if err != nil {
		return fmt.Errorf("error creating the vector file: %w", err)
	}
	defer outFile.Close()

	if err := model.Save(outFile, "text"); err != nil {
		return fmt.Errorf("error saving the Word2Vec model: %w", err)
	}

	fmt.Println(*outFile)
	fmt.Println("Word2Vec model successfully trained and saved.")
	return nil
}

func joinCorpus(tagCorpus [][]string) string {
	var corpusBuilder strings.Builder
	for _, tags := range tagCorpus {
		corpusBuilder.WriteString(strings.Join(tags, " ") + "\n")
	}
	return corpusBuilder.String()
}
