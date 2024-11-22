import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../api/movieApi";
import { truncateDescription } from "../utils/utils";
import { Movie } from "../types/types";
const Explore: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null); 
        const response = await getMovies();

        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          console.error("Formato inesperado de la respuesta.");
          setError("Error: formato inesperado de la respuesta del servidor.");
        }
      } catch (err) {
        console.error("Error al obtener películas:", err);
        setError("Error al cargar las películas. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
        console.log("Movies", movies)
      }
    };

    fetchMovies();
    console.log("Movies", movies)
  }, );

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.release_date}
          rating={movie.rating}
          description={truncateDescription(movie.overview)}
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          genres={["Action", "Triller"]}
        />
      ))}
    </div>
  );
};

export default Explore;
