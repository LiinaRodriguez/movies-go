import Home from './pages/Home'
import ProtectedPages from './pages/ProtectedPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Settings  from './pages/Settings';
import Layout from './app/Layout';
import MovieDetail from './pages/MovieDetail'
import SearchResults from './pages/SearchResults';
import Foryou from './pages/Foryou';
import Favorites from './pages/Favorites';
import Ratings from './pages/Ratings';

const App = (): JSX.Element => {
  return (
    <>
    <Router>
      <div className='h-full '>
        <Routes>
          <Route path="/"  element={<Home/>} />
            <Route element={<ProtectedPages />}>
              <Route element={<Layout/>} >
                <Route path="/explore" element={<Explore />} />
                <Route path="/movie/:movieId" element={<MovieDetail />} />
                <Route path= "/find/:query" element={<SearchResults/>}/>
                <Route path="/foryou" element={<Foryou/>} />
                <Route path='/favorites' element={<Favorites />} />  
                <Route path='/myratings'element={<Ratings/>} />
              </Route>
              <Route path='/settings' element={<Settings/>} />
              <Route path='/profile' element={ <Profile/>} />
            </Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
