import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registerUser } from "../../api/authApi";


const Signup = ({ toggleForm }: { toggleForm: () => void }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState('')

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = {
        name,
        lastname,
        email,
        password,
      };
      const response = await registerUser(user)
      console.log('User registered', response)

    } catch (error) {
      setError('An error has ocurred during registration')
      console.log('Error', error)
    }
    
    
    navigate('/explore'); // Redirige al usuario al dashboard tras iniciar sesión
  };

  const [showPassword, setShowPassword] = useState(false); 



  return (
    <section className="w-full rounded-lg mx-auto my-4 p-4 flex flex-wrap items-stretch ">
      <div className="w-full px-4 rounded-3xl bg-gray-100 py-12 sm:px-6 sm:py-16 lg:w-full lg:px-8 lg:py-8 backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <div className="mx-auto flex flex-col items-center max-w-lg text-center">
         
          <p className="text-gray-100 text-4xl font-medium font-serif">Start now 🎬</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-4 max-w-md space-y-4"
        >
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="Name" className="sr-only">Name</label>
            <div className="relative">
              <input
                name="Name"
                id="Name"
                type="text"
                title="Name"
                className="w-full rounded-lg border-gray-200 bg-[#F0EDFF] p-3 pe-12 text-sm shadow"
                placeholder="First Name"
                onChange={(e) => setName(e.target.value)}        
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
              </span>
            </div>
          </div>

    <div className="w-1/2">
      <label htmlFor="Lastname" className="sr-only">Last Name</label>
    <div className="relative">
      <input
        name="Lastname"
        id="Lastname"
        type="text"
        title="Lastname"
        className="w-full rounded-lg border-gray-200 bg-[#F0EDFF] p-3 pe-12 text-sm shadow"
        placeholder="Last Name"
        onChange={(e) => setLastname(e.target.value)}          
        required
      />
      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
      <svg xmlns="http://www.w3.org/2000/svg"
      className="size-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
      </span>
    </div>
  </div>
</div>

            <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                name="email"
                id="email"
                type="email"
                title="Email"
                className="w-full rounded-lg border-gray-200 bg-[#F0EDFF] p-3 pe-12 text-sm shadow"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                id="PasswordInput"
                type={showPassword ? "text" : "password"} 
                className="w-full rounded-lg border-gray-200 bg-[#F0EDFF] p-3 pe-12 text-sm shadow"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.956 10.956 0 0012 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.523 5 12 5c1.106 0 2.154.142 3.146.402"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">
            <a className="text-blue-500 hover:textblue-700 cursor-pointer hover:underline"> </a>
            </p>

            <p className="text-sm italic text-gray-300">
            Already have an account?{" "}
            <a
              className="text-blue-500 hover:text-blue-700 cursor-pointer hover:underline"
              onClick={toggleForm}
            >
              Login
            </a>
          </p>

            
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block m-auto rounded-lg bg-blue-500 hover:bg-blue-600 px-3 py-2  text-sm font-medium text-white"
            >
              Sign Up
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
        
      </div>
     
    </section>
  );
}

export default Signup;