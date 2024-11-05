import Footer from '../components/Footer'
import  Navbar from  './../components/navigation/navbar'

export default function Home() {
  return (
    <>
    <div className=" min-h-screen bg-[repeating-linear-gradient(to_right,#0a171f_0px,#0a171f_80px,#101d25_80px,#101d25_160px)] text-white flex flex-col justify-center items-center">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center px-52 w-full mt-20">
          <img src='/main.png' width={400} />
          <p className="font-semibold text-center text-5xl font-serif">
            Rate your favorite <span className=" font-bold">movies</span> & 
          </p>
          <p className="font-semibold text-center text-5xl font-sans">discover new 
            <span className=""> recommendations</span>  
            <span className=" font-bold"> tailored just for you!</span>
          </p>
          <button className="rounded-3xl mt-4 px-6 py-2 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15">
            Sign Up now
          </button>
        </div>
        <Footer />
      </div>  
    </>
  )
}