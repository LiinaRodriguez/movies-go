import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star } from "../assets/Icons";
import { Movie } from "../types/types";

const MovieDetail: React.FC = () => {
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (location.state) {
      setMovie(location.state as Movie); // Asegúrate de que `location.state` es del tipo esperado
    }
  }, [location.state]); // Esto solo se ejecutará cuando `location.state` cambie

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div
        className="w-full h-72 bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${movie.poster_path})` }}
      >
        <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 p-4 h-full space-y-2">
          <h1 className="text-white text-3xl font-semibold">{movie.title}</h1>
          <p className="text-white text-lg">{movie.release_date}</p>
        </div>
      </div>

      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-md space-y-4">
        <p className="text-gray-700 text-lg">{movie.overview}</p>
        <div className="flex items-center text-gray-900 font-semibold text-base space-x-2">
          <Star size={20} color="#facc15" />
          <p>{movie.rating}</p>
        </div>

        <div className="space-x-2 text-sm text-gray-600">
          {movie.genres.map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-medium"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
