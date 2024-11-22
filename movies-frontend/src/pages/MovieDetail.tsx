import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star } from "../assets/Icons";
import { Movie } from "../types/types";

// Datos de ejemplo de las películas (puedes reemplazarlos con una llamada API si es necesario)
const moviesData: Movie[] = [
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
    id: 2,
    title: "The Matrix",
    year: "1999",
    rating: "8.7",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality...",
    image: "https://example.com/matrix.jpg",
    genres: ["Action", "Sci-Fi"]
  },
  // Puedes agregar más películas aquí
];

const MovieDetail: React.FC = () => {
  const { movieId } = useParams(); // Obtener el ID de la película desde la URL
  const [movie, setMovie] = useState<Movie | null>(null); // Estado que acepta null o Movie

  useEffect(() => {
    const selectedMovie = moviesData.find((movie) => movie.id === parseInt(movieId!));
    setMovie(selectedMovie || null); // Asignar la película o null si no se encuentra
  }, [movieId]);

  if (!movie) {
    return <div>Cargando...</div>; // O manejar el caso cuando no se encuentra la película
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div
        className="w-full h-72 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${movie.image})` }}
      >
        <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 p-4 h-full space-y-2">
          <h1 className="text-white text-3xl font-semibold">{movie.title}</h1>
          <p className="text-white text-lg">{movie.year}</p>
        </div>
      </div>

      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-md space-y-4">
        <p className="text-gray-700 text-lg">{movie.description}</p>
        <div className="flex items-center text-gray-900 font-semibold text-base space-x-2">
          <Star size={20} color="#facc15" />
          <p>{movie.rating}</p>
        </div>

        <div className="space-x-2 text-sm text-gray-600">
          {movie.genres.map((genre, index) => (
            <span key={index} className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-medium">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
