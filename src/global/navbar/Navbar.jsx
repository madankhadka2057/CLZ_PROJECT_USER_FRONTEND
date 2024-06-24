import { useRef, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const refElement = useRef()
  const handleModel = (e) => {
    if (refElement.current === e.target) {
      setIsMenuOpen(false)
    }
  }
  const navigate = useNavigate()
  const location = useLocation()
  const handleScroller = () => {
    if (location.pathname == "/home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {

      navigate('/home')
    }
  }
  return (
    <nav onClick={handleModel} className="  sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black-800 bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8  lg:py-4">
      <div ref={refElement} className="flex items-center justify-between text-blue-gray-900">
        <a
          href="#"
          className="mr-4 hello block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
        >
          Online Food
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden  mr-4 sm:block">
            <ul className="flex flex-col gap-4 mt-2 mb-4 sm:mb-0 sm:mt-0 sm:flex-row sm:items-center lg:gap-8 ">
              <li onClick={() => handleScroller(refElement)} className="block p-1  cursor-pointer font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:rounded-sm hover:bg-gray-200">
                <a className={`flex items-center  font-bold ${location?.pathname == "/home" ? "text-blue-700 font-bold" : " "} `}>
                  Home
                </a>
              </li>
              <li onClick={() => { navigate('/product') }} className="block p-1 cursor-pointer font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:rounded-sm hover:bg-gray-200 ">
                <a className={`flex items-center font-bold ${location?.pathname == "/product" ? "text-blue-700 " : " "}`}>
                  Product
                </a>
              </li>
              <li  className="block p-1 font-sans text-sm antialiased cursor-pointer font-medium leading-normal text-blue-gray-900 hover:rounded-sm hover:bg-gray-200">
                <a href="#" className="flex font-bold items-center ">
                  My Order
                </a>
              </li>
              <li onClick={() => { navigate('/home#contactus') }}  className="block p-1 font-sans text-sm antialiased cursor-pointer font-medium leading-normal text-blue-gray-900 hover:rounded-sm hover:bg-gray-200">
                <a href="/home#contactus" className="flex font-bold items-center">
                  About us
                </a>
              </li>
              <div className="relative cursor-pointer">
                <FaShoppingCart className="text-2xl text-gray-800 hover:text-gray-600 cursor-pointer" />
                <span className="absolute bottom-4 left-6 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full" >3</span>
              </div>
            </ul>
          </div>
          <div className="flex items-center gap-x-1">
            <button onClick={() => { navigate('/login', { state: { prev_location: location } }) }}
              className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:inline-block"
              type="button"
            >
              <span>Log In</span>
            </button>
            <button
              className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:inline-block"
              type="button"
            >
              <span>Sign in</span>
            </button>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:hidden"
            type="button"
            onClick={toggleMenu}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>

      <div
        className={` lg:flex-row lg:items-center  left-0 border-white/90 bg-opacity-95  backdrop-blur-2xl backdrop-saturate-200  absolute bg-white w-full lg:gap-6 transition-height sm:hidden  ${isMenuOpen ? 'height-auto' : 'hidden'
          }`}
      >
        <ul className="flex  px-3 flex-col gap-2  mt-2 mb-4 lg:mb-0 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-slate-400 hover:bg-opacity-10 active:text-blue-600">
            <a onClick={() => handleScroller(refElement)} className="flex items-center">
              Home
            </a>
          </li>
          <li onClick={() => { navigate('/product') }} className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-slate-400 hover:bg-opacity-10">
            <a href="#" className="flex items-center">
              Product
            </a>
          </li>
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-slate-400 hover:bg-opacity-10">
            <a href="#" className="flex items-center">
              My Order
            </a>
          </li>
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-slate-400 hover:bg-opacity-10">
            <a href="#" className="flex items-center">
              About us
            </a>
          </li>
          <div className="relative">
            <FaShoppingCart className="text-2xl text-gray-800 hover:text-gray-600 cursor-pointer" />
            <span className="absolute gap-6 bottom-4 left-6 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">3</span>
          </div>
        </ul>
        <div className="flex flex-col gap-2 lg:flex-row w-full items-center ">
          <button onClick={() => { navigate('/login') }}
            className="w-80 px-4  py-2 mb-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block lg:w-auto lg:mb-0"
            type="button"
          >
            <span>Log In</span>
          </button>
          <button
            className="w-80  select-none rounded-md mb-4 bg-gradient-to-tr from-gray-600 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block lg:w-auto"
            type="button"
          >
            <span>Sign in</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
