const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/', 
  apiKey: '6eb8b63cd876fdf9e24de7e09b72b008',
  originalImage: (imagePath: string) => `https://image.tmdb.org/t/p/original/${imagePath}`,
  w500Image: (imagePath: string) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
}

export default apiConfig;