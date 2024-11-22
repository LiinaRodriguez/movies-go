import { useState, useEffect } from "react";
import { Star } from "../assets/Icons";
import { Link } from "react-router-dom";
import { truncateDescription } from "../utils/utils";
import { removeFavorite, addFavorite, addRate } from "../api/movieApi";

interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  rating: string;
  overview: string;
  poster_path: string;
  genres: string[];
  imdb_id: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  release_date,
  rating,
  overview,
  poster_path,
  genres,
  imdb_id,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (imdb_id) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (Array.isArray(favorites)) {
        setIsFavorite(favorites.includes(imdb_id)); // Verifica directamente si existe
      } else {
        console.warn("Invalid favorites data in localStorage");
        localStorage.setItem("favorites", JSON.stringify([])); // Corrige datos corruptos
      }
    }
  }, [imdb_id]);

  const toggleFavorite = async () => {
    const userIdFromStorage = localStorage.getItem("user_id");
    const favorite = {
      movie_id: imdb_id ? imdb_id.slice(2) : undefined,
      user_id: userIdFromStorage ? parseInt(userIdFromStorage) : undefined,
    };

    // Verifica favoritos en localStorage
    let favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!Array.isArray(favorites)) {
      console.warn("Invalid favorites data in localStorage");
      favorites = [];
    }

    if (isFavorite) {
      // Eliminar de favoritos
      const updatedFavorites = favorites.filter((movieId) => movieId !== imdb_id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);

      // Eliminar en la base de datos
      try {
        await removeFavorite(favorite as { movie_id: string; user_id: number });
      } catch (error) {
        console.error("Error removing favorite from database", error);
      }
    } else {
      // Agregar a favoritos
      favorites.push(imdb_id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);

      // Agregar en la base de datos
      try {
        await addFavorite(favorite as { movie_id: string; user_id: number });
      } catch (error) {
        console.error("Error adding favorite to database", error);
      }
    }
  };

  const toggleRateModal = () => {
    setShowRateModal(!showRateModal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toggleRateModal()
    e.preventDefault();
    const userIdFromStorage = localStorage.getItem("user_id");
    const movieRating = {
      movie_id: imdb_id ? imdb_id.slice(2) : "",
      user_id: userIdFromStorage ? parseInt(userIdFromStorage) : 0,
      rating: score
    }
    try {
      
      await addRate(movieRating as { movie_id: string, user_id: number, rating: number })
      console.log({
        imdb_id,
        movie_id: imdb_id ? imdb_id.slice(2) : "",
        user_id: userIdFromStorage ? parseInt(userIdFromStorage) : 0,
        score,
      });
      
      
    }catch (error) {
      console.error("Error adding favorite to database", error);
    }
    
  }

  return (
    <div className="w-52 h-96 m-2">
      <div
        className="w-52 h-72 flex items-end rounded-t-3xl bg-contain bg-center bg-no-repeat relative group"
        style={{
          backgroundImage: `url(${poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black rounded-t-3xl p-2 space-y-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400/80">
          <p className="text-white font-semibold text-lg">Year: {release_date}</p>
          <hr className="mx-4 my-2 border-t-4 border-white opacity-100" />
          <p className="text-gray-100 text-center font-semibold text-base">
            {truncateDescription(overview)}
          </p>
          <div className="flex items-center text-white font-semibold text-base space-x-2">
            <Star size={20} color="#facc15" />
            <p>{rating}</p>
          </div>
          <button
            className="px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition"
            onClick={toggleRateModal}
          >
            Rate
          </button>
        </div>

        <span
          onClick={toggleFavorite}
          className="absolute shadow-xl top-2 right-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={29}
            height={29}
            fill={isFavorite ? "red" : "none"}
            stroke={isFavorite ? "red" : "white"}
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      </div>

      <Link
        to={`/movie/${id}`}
        state={{ id, title, release_date, rating, overview, poster_path, genres }}
      >
        <p className="text-gray-900 bg-gray-200/80 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-b border-x border-gray-400/80 h-min font-semibold text-center py-2 rounded-b-3xl text-lg">
          <span className="block text-gray-800 text-sm">{title}</span>
          <span className="flex justify-center space-x-2 text-sm text-gray-600">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </span>
        </p>
      </Link>

      {showRateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Rate "{title}"</h2>
            <input
              type="number"
              min="0"
              max="10"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
              placeholder="Enter a rating (0-10)"
              onChange={(e)=>setScore(parseInt(e.target.value))}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleRateModal}
                className="px-4 py-2 bg-gray-300 rounded-full text-black hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <form onSubmit={handleSubmit}>
              <button
                 
                  type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
              >
                Submit
                </button>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
