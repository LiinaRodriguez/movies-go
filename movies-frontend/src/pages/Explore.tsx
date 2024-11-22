import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../api/movieApi";

import { Movie } from "../types/types";
const Explore: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("All");

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamada a la API con el valor seleccionado como filtro
        const response = await getMovies(selectedOption);

        if (response && Array.isArray(response.data)) {
          setMovies(response.data);
          console.log("movies", response.data)
        } else {
          console.error("Formato inesperado de la respuesta.");
          setError("Error: formato inesperado de la respuesta del servidor.");
        }
      } catch (err) {
        console.error("Error al obtener películas:", err);
        setError("Error al cargar las películas. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      {/* Dropdown siempre visible 
      <CustomDropdown
        selected={selectedOption}
        onSelect={setSelectedOption}
      />*/}

      {/* Contenido según el estado */}
      {loading && <div>Loading movies...</div>}
      {error && <div className="text-red-500">{error}</div>}
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
            imdb_id={movie.imdb_id}
          />
        ))}
      </div>
    </div>
  );
};


export default Explore;
