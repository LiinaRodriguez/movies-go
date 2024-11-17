
const movies = [
  {
    "id": 1,
    "cover": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg",
    "title": "Dune",
    "year": 2021,
    "genre": ["Adventure", "Sci-Fi"],
    "rating": 8.0,
    "duration": "2h 35m",
    "description": "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    "director": "Denis Villeneuve",
    "cast": [
      "Timothée Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac"
    ],
    "link": "https://www.imdb.com/title/tt1160419/"
  },
  {
    "id": 2,
    "cover": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg",
    "title": "The Godfather",
    "year": 1972,
    "genre": ["Crime", "Drama"],
    "rating": 9.2,
    "duration": "2h 55m",
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "director": "Francis Ford Coppola",
    "cast": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan"
    ],
    "link": "https://www.imdb.com/title/tt0068646/"
  },
  {
    "id": 3,
    "cover": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg",
    "title": "Interstellar",
    "year": 2014,
    "genre": ["Adventure", "Drama", "Sci-Fi"],
    "rating": 8.6,
    "duration": "2h 49m",
    "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "director": "Christopher Nolan",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain"
    ],
    "link": "https://www.imdb.com/title/tt0816692/"
  }
]
import Logout from "../../pages/auth/Logout"
import MovieList from "../MovieList"
export default function Sidebar() {
  return (
    <>
      <div className="p-4 sm:ml-64 ">
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  border-gray-200 mb-2  rounded-xl dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full p-4 ml-4 mr-2 mt-12 mb-10 rounded-2xl overflow-y-auto bg-shark-950">
            <a href="/" className="flex items-center ps-2.5 mb-5">
              <img src="/icon-popcorn.png" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Movies</span>
            </a>
            <ul className="space-y-2 font-medium">
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>

                    <span className="ms-3">Home</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
                   
                  </a>
            </li>
            <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">For you</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Favorites</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                  </a>
              </li>
              <li>
                  <a href="#" className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                  </a>
              </li>
              <li>
                  <a href="#" onClick={Logout} className="flex items-center p-2 text-gray-200 hover:text-emerald-400 rounded-lg  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                  </a>
              </li>
            </ul>
        </div>
      </aside>
      </div>

      <div className="p-4 sm:ml-64">
        <div className="min-h-screen bg-mine-shaft-950 flex flex-col items-center rounded-2xl justify-center">
        <form className="max-w-lg w-96 mb-5 mx-1">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm  border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search Movies, series, tv shows..." required />
              
          </div>
      </form>
          <MovieList movies={movies} />
          <MovieList movies={movies} />
          <MovieList movies={movies} />
    </div>
  
        </div>

    </>
  )
}