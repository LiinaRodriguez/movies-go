import Home from './pages/Home'
import ProtectedPages from './pages/ProtectedPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Settings  from './pages/Settings';
import Layout from './app/Layout';
import MovieDetail from './pages/MovieDetail'


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
                <Route path="/movie/:movieId" element={<MovieDetail/>} />
                <Route path="/foryou" />
                <Route path='/favorites' />
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
