import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { truncateDescription } from "../utils/utils";

// Ejemplo de películas estáticas (puedes reemplazar con API o base de datos)
const moviesData = [
  {
    id: 1,
    title: "Inception",
    year: "2010",
    rating: "8.8",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...A thief who steals corporate secrets through the use of dream-sharing technology...",
    image: "https://example.com/inception.jpg",
    genres: ["Action", "Sci-Fi", "Thriller"]
  },
  {
    id:2,
    title: "The Matrix",
    year: "1999",
    rating: "8.7",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality...",
    image: "https://example.com/matrix.jpg",
    genres: ["Action", "Sci-Fi"]
  },
];

const Explore: React.FC = () => {
  const [movies, setMovies] = useState(moviesData); // Estado para almacenar las películas

  useEffect(() => {
    // Aquí podrías hacer una llamada a una API para obtener las películas
    // fetch("/api/movies")
    //   .then(response => response.json())
    //   .then(data => setMovies(data));
    setMovies(moviesData)
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          id={movie.id}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
          description={truncateDescription(movie.description)}
          image={movie.image}
          genres={movie.genres}
        />
      ))}
    </div>
  );
};

export default Explore;
