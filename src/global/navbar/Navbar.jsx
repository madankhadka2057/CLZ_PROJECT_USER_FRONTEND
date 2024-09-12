import { useEffect, useRef, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCartItem } from '../../store/cartSlice';
import Tostify from '../Toastify/Tostify';
import { getAuth } from '../../store/authSlice';
const Navbar = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState();
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
  const { cartItem } = useSelector((state) => state.cart)
  const token = localStorage.getItem('token')
  const HandleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: "Logout successfully" }));
    window.location.reload();
  }

  // const data = JSON.parse(sessionStorage.getItem("toastMessage"));
  // const getAuth=async()=>{
  //   try{
  //     const {data}=await authenticatedApi.get("/auth/getauth")
  //     setAuth(data.data)

  //   }catch(err){
  //     console.log(err)
  //     alert("Error accure")
  //   }
  // }
  useEffect(() => {
    dispatch(fetchCartItem());
    const toastData = JSON.parse(sessionStorage.getItem("toastMessage"));
    if (toastData) {
      Tostify(toastData);
    }
    if (token) {
      dispatch(getAuth())
    }
  }, []);
  const { data } = useSelector((state) => state.auth)
  //toggle user profile section!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let dropdownMenu = document.getElementById('dropdownMenu');
  function handleClick() {
    if (dropdownMenu.className.includes('block')) {
      dropdownMenu.classList.add('hidden')
      dropdownMenu.classList.remove('block')
    } else {
      dropdownMenu.classList.add('block')
      dropdownMenu.classList.remove('hidden')
    }
  }
  //end toggle user profile section!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <nav onClick={handleModel} className=" sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black-800 bg-sky-950 border rounded-none shadow-2xl shadow-sky-950 border-sky-950  h-max  bg-opacity-100 backdrop-blur-2xl backdrop-saturate-200 lg:px-8  lg:py-4">
      <div ref={refElement} className="flex items-center justify-between text-white">
        <a
          onClick={() => navigate("/home")}
          className="mr-4 tracking-wide text-2xl hello block cursor-pointer py-1.5 font-sans  font-medium leading-relaxed text-inherit antialiased"
        >
          Food Plazaa
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden  mr-4 sm:block">
            <ul className="flex flex-col gap-4 mt-2 mb-4 sm:mb-0 sm:mt-0 sm:flex-row sm:items-center lg:gap-8 ">
              <li onClick={() => handleScroller(refElement)} className="block   cursor-pointer font-sans text-sm antialiased font-medium leading-normal text-white hover:rounded-[50px] px-4 py-2 hover:bg-gray-400">
                <a className={`flex items-center  font-bold ${location?.pathname == "/home" ? "text-blue-700 font-bold" : " "} `}>
                  Home
                </a>
              </li>
              <li onClick={() => { navigate('/product') }} className="block p-1 cursor-pointer font-sans text-sm antialiased font-medium leading-normal text-white hover:rounded-[50px] px-4 py-2 hover:bg-gray-400 ">
                <a className={`flex items-center font-bold ${location?.pathname == "/product" ? "text-blue-700 " : " "}`}>
                  Product
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased cursor-pointer font-medium leading-normal text-white hover:rounded-[50px] px-4 py-2 hover:bg-gray-400">
                <a onClick={() => { navigate('/myorder') }} className={`  ${location?.pathname == "/myorder" ? "text-blue-700" : ""} flex font-bold items-center `}>
                  My Order
                </a>
              </li>
              <li onClick={() => { navigate('/home#contactus') }} className="block p-1 font-sans text-sm antialiased cursor-pointer font-medium leading-normal text-white hover:rounded-[50px] px-4 py-2 hover:bg-gray-400">
                <a href="/home#contactus" className="flex font-bold items-center">
                  Contact us
                </a>
              </li>
              {cartItem.length > 0 && <div className="relative cursor-pointer">
                <FaShoppingCart onClick={() => { navigate('/cart') }} className="text-2xl text-white hover:text-gray-600 cursor-pointer" />
                <span className="absolute bottom-4 left-6 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full" >{cartItem.length}</span>
              </div>}
            </ul>
          </div>
          {
            token == null || token == undefined ? (
              <div className="flex items-center gap-x-1">

                <button onClick={() => { navigate('/login', { state: { prev_location: location } }) }}
                  className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:inline-block"
                  type="button"
                >
                  <span>Log In</span>
                </button>
                <button onClick={() => navigate('/singup')}
                  className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:inline-block"
                  type="button"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div class="relative font-[sans-serif] w-max mx-auto">
                <button type="button" onClick={handleClick} id="dropdownToggle"
                  class="px-4 py-2 flex items-center rounded-full text-white text-sm border border-gray-300 outline-none hover:bg-gray-400">
                  <img src="https://readymadeui.com/profile_6.webp" class="w-7 h-7 mr-3 rounded-full shrink-0"></img>
                  {data?.userName || "Madan"}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-400 inline ml-3" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clip-rule="evenodd" data-original="#000000" />
                  </svg>
                </button>

                <ul id="dropdownMenu" class='absolute hidden shadow-lg  bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto'>
                  <a href='/viewprofile' class='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-3" viewBox="0 0 512 512">
                      <path
                        d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                        data-original="#000000"></path>
                    </svg>
                    View profile
                  </a>
                  <li class='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-3" viewBox="0 0 512 512">
                      <path
                        d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                        data-original="#000000"></path>
                    </svg>
                    Dashboard
                  </li>
                  <li onClick={() => HandleLogout()} class='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-3"
                      viewBox="0 0 6.35 6.35">
                      <path
                        d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                        data-original="#000000"></path>
                    </svg>
                    Logout
                  </li>
                </ul>
              </div>
            )


          }
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
        className={` lg:flex-row lg:items-center  left-0  bg-sky-950 bg-opacity-100  backdrop-blur-2xl backdrop-saturate-200  absolute shadow-2xl border-none w-full lg:gap-6 transition-height sm:hidden  ${isMenuOpen ? 'height-auto' : 'hidden'
          }`}
      >
        <ul className="flex  px-3 flex-col gap-2  mt-2 mb-4 lg:mb-0 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white hover:bg-slate-400 hover:bg-opacity-10 active:text-blue-600">
            <a onClick={() => handleScroller(refElement)} className="flex items-center">
              Home
            </a>
          </li>
          <li onClick={() => { navigate('/product') }} className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white hover:bg-slate-400 hover:bg-opacity-10">
            <a className="flex items-center">
              Product
            </a>
          </li>
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white hover:bg-slate-400 hover:bg-opacity-10">
            <a onClick={() => navigate('/myorder')} className="flex items-center">
              My Order
            </a>
          </li>
          <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white hover:bg-slate-400 hover:bg-opacity-10">
            <a href="/home#contactus" className="flex items-center">
              Contact us
            </a>
          </li>
          {cartItem.length > 0 && <div className="relative" >
            <FaShoppingCart onClick={() => { navigate('/product') }} className="text-2xl text-white hover:text-gray-600 cursor-pointer" />
            <span className="absolute gap-6 bottom-4 left-6 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">{cartItem.length}</span>
          </div>}
        </ul>
        {token == null || token == undefined || token == null ? (
          <div className="flex flex-col gap-2 lg:flex-row w-full items-center ">
            <button onClick={() => { navigate('/login') }}
              className="w-80 px-4  py-2 mb-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block lg:w-auto lg:mb-0"
              type="button"
            >
              <span>Log In</span>
            </button>
            <button onClick={() => navigate('/singup')}
              className="w-80  select-none rounded-sm mb-4 bg-gradient-to-tr from-gray-600 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block lg:w-auto"
              type="button"
            >
              <span>Sign Up</span>
            </button>
          </div>
        ) : (
          <button onClick={() => HandleLogout()}
            className=" px-4 text-white mb-3  bg-red-500 py-2 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-sm select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none sm:inline-block"
            type="button"
          >
            <span >Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
