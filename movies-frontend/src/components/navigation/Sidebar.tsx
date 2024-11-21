import { Link } from 'react-router-dom'

import { Compass, Heart, UserCircle, Settings, Inbox, Film, Edit } from '../../assets/Icons'

const sideBarTop = [
  { name: 'Explore', icon: <Compass />, href: '/explore' },
  { name: 'For you', icon: <Inbox />, href: '/foryou' },
  { name: 'Favorites', icon: <Heart />, href: '/favorites' },
  {name: 'Your ratings', icon:<Edit />, href: '/myratings'}
];

const sideBarBottom = [
  { name: 'Profile', icon: <UserCircle />, href: '/profile' },
  { name: 'Settings', icon: <Settings />, href: '/settings' },
];


export default function Sidebar() {

  const renderSideBarItems = (items: { name: string, icon: JSX.Element, href: string }[]) =>
    items.map((item) => (
      <li key={item.name}>
        <Link
          to={item.href}
          className="flex font-montserrat font-light text-base items-center pl-2 py-2 text-gray-200 hover:text-emerald-400 group"
        >
          {item.icon}
          <span className="ms-3">{item.name}</span>
        </Link>
      </li>
    ));
  return (
    <>
      <div className="p-4 sm:ml-64 ">
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0  border-gray-200 mb-2  rounded-xl dark:border-gray-700" aria-label="Sidebar">
          
          <div className=" p-4 ml-4 mr-2 mt-4 mb-10 rounded-2xl overflow-y-auto bg-shark-950">
          
            <ul className="space-y-2 font-medium">
            <li>
            <Link
              to='/'
              className="flex font-montserrat font-light text-base items-center pl-2 py-2   text-emerald-300 hover:text-emerald-300  group"
            >
                  <Film  />
              <span className="ms-3 font-bold">Movies</span>
            </Link>
          </li>
              {renderSideBarItems(sideBarTop)}
            
              <hr className="my-4 border-gray-600" />

              {renderSideBarItems(sideBarBottom)}
              
            </ul>
        </div>
      </aside>
      </div>
    </>
  )
}