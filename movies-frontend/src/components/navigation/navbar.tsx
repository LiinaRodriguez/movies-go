
const links = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movies' },
  { name: 'Tv Shows', href: '/tvshows' },
  { name: 'Explore', href: '/explore' }
];

const linksItems = links.map((link) => {
  return (
      <li className="" key={link.name}><a
          
          href={link.href}
          className="block py-2 px-3 font-sans text-white rounded md:p-0 "
      >
          <p>{link.name}</p>
    </a>
    </li>
  )
})

function NavLinks() {

  return (
    <>
      <nav className=" fixed w-full z-20 top-0 start-0  border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./../../../public/icon-popcorn.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-mono font-semibold whitespace-nowrap dark:text-white">Movies</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="text-white  focus:outline-none  font-medium rounded-3xl hover:bg-white hover:text-black text-sm px-4 mx-2  py-3 text-center bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15">Log In</button>
            <button type="button" className="text-white  focus:outline-none  font-medium rounded-3xl hover:bg-white hover:text-black text-sm px-4 py-2 text-center mx-1 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15">Sign Up</button>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:px-4 md:py-2 mt-4 font-medium border-1 border-white rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  md:border-1 md:rounded-full">
            {linksItems}
          </ul>
        </div>
        </div>
      </nav>
    </>
  )
}

export default function Navbar() {
  return (
      <NavLinks />
  )
}