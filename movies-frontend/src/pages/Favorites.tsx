import { useState, useEffect } from "react";
import { Movie } from "../types/types";
import { getFavorites } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const Favorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const userIdFromStorage = localStorage.getItem("user_id");
      const user = {
        user_id: userIdFromStorage ? parseInt(userIdFromStorage) : undefined,
        email: localStorage.getItem("user") || "",
        token: localStorage.getItem("token") || "",
      };

      if (!user.user_id || !user.email || !user.token) {
        setError("Información del usuario no válida.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getFavorites(user as {
          user_id: number;
          email: string;
          token: string;
        });

        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
          
          //Save favorites in local
          const favoritesFromDB = response.data.map((movie: { imdb_id: string }) => movie.imdb_id);
          const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || "[]");
          const combinedFavorites = Array.from(new Set([...favoritesFromStorage, ...favoritesFromDB]));
          localStorage.setItem("favorites", JSON.stringify(combinedFavorites));

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
    <div className="p-6">
      {loading && <Loader />}
      {error && <div className="text-red-600 text-center">{error}</div>}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center text-gray-500 text-lg font-medium">
          No tienes películas favoritas aún. ¡Explora y guarda tus favoritas!
        </div>
      )}
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
            imdb_id={movie.imdb_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
