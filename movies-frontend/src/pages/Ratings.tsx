import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Movie } from "../types/types";
import { getRated} from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
const Ratings = () => {
  const { query } = useParams(); // Obtener el término de búsqueda de la URL
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchMovies = async () => {
      const userIdFromStorage = localStorage.getItem("user_id");
      const user = {
        user_id: userIdFromStorage ? parseInt(userIdFromStorage) : -1,
        page: 1,
        pageSize: 20,
      };
      try {
        setLoading(true);
        setError(null);
        const response = await getRated(user as {user_id:number, page:number, pageSize:number}); // Llamada a la API con el término de búsqueda
        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
          console.log(response.data)
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
  }, []); 

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
            genres={["", ""]}
            imdb_id={movie.imdb_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Ratings;