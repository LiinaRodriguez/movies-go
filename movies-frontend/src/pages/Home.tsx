import Login from '../pages/auth/Login'
import Signup from './auth/Signup';
import { useState } from "react";

const Home = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="relative h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('./background-login-page.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-black from-opacity-80 via-opacity-30 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-10">
        {/* Form container */}
        <div className="w-2/3"></div>
        <div className="w-1/3 max-w-md">
          {/* Transition simple entre los formularios */}
          {isLogin ? (
            <Login toggleForm={toggleForm} />
          ) : (
            <Signup toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
