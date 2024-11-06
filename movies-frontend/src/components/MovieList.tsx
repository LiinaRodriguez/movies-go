import React from 'react';

// Definición de la interfaz Movie que representa los datos de cada película
interface Movie {
  id: number;
  cover: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  duration: string;
  description: string;
  director: string;
  cast: string[];
  link: string;
}

// Propiedades del componente MovieCard
interface MovieCardProps {
  movie: Movie;
}

// Componente que muestra los detalles de una película
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-md bg-shark-950 m-2 flex items-center flex-col">
    {/* Portada de la película */}
    <img className="w-8/6 h-auto object-cover mx-1" src={movie.cover} alt={`${movie.title} cover`} />
    <div className=" py-2 text-gray-200 w-1/2 mx-1"> {/* Ajuste el ancho del contenedor del texto */}
      {/* Título y año de la película */}
      <div className="font-bold text-lg mb-1">{movie.title} ({movie.year})</div>
      {/* Descripción de la película */}
      {/* <p className="text-sm mb-1">{movie.description}</p> */}
      {/* Información adicional */}
      <p className="text-xs mb-1"><strong>Director:</strong> {movie.director}</p>
      <p className="text-xs mb-1"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
      <p className="text-xs mb-1"><strong>Genres:</strong> {movie.genre.join(', ')}</p>
      <p className="text-xs"><strong>Duration:</strong> {movie.duration}</p>
    </div>
    <div className=" pt-2 w-1/2  pb-1 flex justify-evenly items-center">
      {/* Rating de la película */}
      <span className="bg-emerald-500 text-white font-semibold py-1 px-2 rounded-full text-xs">
        {movie.rating} / 10
      </span>
      {/* Enlace a más información sobre la película */}
      <a 
        href={movie.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-emerald-600 hover:text-emerald-800 text-xs font-semibold"
      >
        More Info
      </a>
    </div>
  </div>
  );
};

// Propiedades del componente MovieList
interface MovieListProps {
  movies: Movie[];
}

// Componente que muestra una lista de películas
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
