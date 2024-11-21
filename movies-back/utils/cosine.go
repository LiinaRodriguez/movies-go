package utils

func CosineSimilarity(userRatings, otherRatings []float64) float64 {
	var dotProduct, userMagnitude, otherMagnitude float64
	for i := 0; i < len(userRatings); i++ {
		dotProduct += userRatings[i] * otherRatings[i]
		userMagnitude += userRatings[i] * userRatings[i]
		otherMagnitude += otherRatings[i] * otherRatings[i]
	}
	if userMagnitude == 0 || otherMagnitude == 0 {
		return 0
	}
	return dotProduct / (userMagnitude * otherMagnitude)
}
