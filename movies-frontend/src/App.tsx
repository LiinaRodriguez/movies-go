import Home from './pages/Home'
import Login from './pages/(auth)/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {

  return (
    <>
    <Router>
      <div className='h-full '>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element= {<Explore/>} />
          <Route path="/yourmovies" />  
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
