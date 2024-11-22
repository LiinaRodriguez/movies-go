import { useState } from "react";
import Logout from "../pages/auth/Logout";
import { ArrowOutSquare } from "../assets/Icons";

type CustomDropdownProps = {
  selected: string;
  onSelect: (option: string) => void;
}
export  function CustomDropdown({selected, onSelect}:CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["All", "Movies", "Series"];
  

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false);
    console.log(selected)
  };

  return (
    <div className="relative w-40">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-shark-950 text-gray-100 w-full px-4 py-2 rounded-3xl flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {selected}
        <svg
          className={`w-4 h-4 transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute bg-shark-950 text-gray-100 w-full mt-2 pt-2 rounded-3xl shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 bg-shark-950 hover:bg-emerald-400 hover:text-black cursor-pointer rounded-3xl"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export  function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0 m-4">
      {/* Botón de Perfil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center py-0 px-4 bg-shark-950 rounded-full focus:outline-none hover:ring-2 hover:ring-emerald-400"
      >
        <img
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=nice`}
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="hidden sm:block font-medium text-gray-100 font-montserrat ml-2">
          John Doe
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-42 bg-shark-950 rounded-3xl shadow-2xl z-10 ">
          <li>
            <button
              onClick={Logout}
              className="block w-full text-left px-4 py-2 hover:text-emerald-400 rounded-3xl bg-shark-950 text-gray-100 border-emerald-400 border "
            >
              <div className="flex "><span className="mr-2">Logout</span>
                {<ArrowOutSquare />}
                </div>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}