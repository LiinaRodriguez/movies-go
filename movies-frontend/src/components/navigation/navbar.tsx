import { useState } from "react";
import { ProfileDropdown } from "../Dropdown";

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("")

  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirige con el término de búsqueda en la URL sin hacer la llamada a la API aquí
    navigate(`/find/${query}`);
  };

  return (
    <nav className="bg-transparent ">
      <div className="max-w-7xl mx-auto pr-4 pl-0 sm:px-0 lg:px-0">
        <div className="flex justify-between items-center h-16 p-4 ml-4 mr-2 mt-2 mb-10">
          
          {/* Barra de búsqueda */}
          <div className="flex-grow  mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 outline-none bg-shark-950 text-gray-100 border-none focus:ring-transparent rounded-full focus:outline-none focus:border-none"
                onChange={(e)=> setQuery(e.target.value) }
              />
             <form onSubmit={handleSearch}>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100 bg-transparent"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.05 11.05a5 5 0 11-10 0 5 5 0 0110 0z"
                  />
                </svg>
                </button>
                </form>
            </div>
          </div>

          <div className="flex-shrink-0 m-4">
            <div className="relative">
              <ProfileDropdown/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
