import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Movie } from "../types/types";
import { findMovie } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
const SearchResults = () => {
  const { query } = useParams(); // Obtener el término de búsqueda de la URL
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return; // No hacer nada si no hay término de búsqueda

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await findMovie(query); // Llamada a la API con el término de búsqueda
        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          setError("Formato inesperado de la respuesta del servidor.");
        }
      } catch (err) {
        setError("Error al cargar las películas. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]); // Hacer la llamada a la API cada vez que el término de búsqueda cambie

  return (
    <div>
      {loading && <Loader movies={movies} />}
      {error && <div>{error}</div>}
      {!loading && !error && movies.length === 0 && <div>No movies found</div>}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            rating={movie.rating}
            overview={movie.overview}
            poster_path={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            genres={["Action", "Thriller"]}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;