import { useState, useEffect } from "react";
import { Movie } from "../types/types";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { getForyou } from "../api/movieApi";

const Foryou = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const userIdFromStorage = localStorage.getItem("user_id");
      const user = {
        user_id: userIdFromStorage ? parseInt(userIdFromStorage) : undefined, // Elimina el caso `null`
        email: localStorage.getItem("user") || "", // Asegúrate de que no sea `null`
        token: localStorage.getItem("token") || "", // Asegúrate de que no sea `null`
      };
    
      if (!user.user_id || !user.email || !user.token) {
        setError("Información del usuario no válida.");
        setLoading(false);
        return;
      }
    
      try {
        setLoading(true);
        setError(null);
    
        const response = await getForyou(user as { user_id: number; email: string; token: string }); // Forzar tipos válidos
        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          setError("Formato inesperado de la respuesta del servidor.");
        }
      } catch (err) {
        setError("Error al cargar las películas. Intenta nuevamente más tarde.");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Hacer la llamada a la API cada vez que el término de búsqueda cambie

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

export default Foryou;