import Home from './pages/Home'
import ProtectedPages from './pages/ProtectedPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';


const App = (): JSX.Element => {

  return (
    <>
    <Router>
      <div className='h-full '>
        <Routes>
          <Route path="/"  element={<Home/>} />
            <Route element={<ProtectedPages />}>
              <Route path="/explore" element= {<Explore/>} />
              <Route path="/foryou" />
              <Route path='/favorites' />
              <Route path='/settings' />
              <Route path='profile'/>
            </Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
