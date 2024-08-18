import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Tostify from "../../global/Toastify/Tostify"
/* eslint-disable */
const Login = () => {
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [Visible,setVisible]=useState(false)
  const location = useLocation()
  const { state } = location
  const handleLogin = async (data) => {
    const response = await axios.post("http://localhost:3000/auth/login", data)
    if (response.status === 200) {

      localStorage.setItem("token", response.data.token)
      if (state?.prev_location?.pathname)
        navigate(state.prev_location.pathname)
        window.location.href="/home"
        sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: "Login successfully" }));
    }else {
      navigate('/home')
      sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: "Login successfully" }));
    }

  }

  const TogglePasswordType =()=>{
    setVisible(!Visible)
  }
  useEffect(() => {
    const toastData = JSON.parse(sessionStorage.getItem("toastMessage"));
    
    if (toastData) {
      Tostify(toastData);
    }
  }, []);
   
  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-12">
                  <h3 className="text-3xl font-extrabold">Sign in</h3>
                  <p className="text-sm mt-4 ">Don't have an account <a  onClick={()=>navigate("/singup")} className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
                </div>
                <div>
                  <label className="text-xs block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email"
                      {...register("email", {
                        required: "Please entered your emali", pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                     <FontAwesomeIcon icon={faEnvelope} /> 
                     
                  </div>
                  {
                    errors.email&&( <p className="text-xs text-red-500 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {errors.email.message}
                    </p>)
                  }
                </div>
                <div className="mt-8">
                  <label className="text-xs block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type={Visible?"text":"password"} required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter password"
                      {...register("password", { required: "Please entered your password" })}
                    />
                    {Visible?<span onClick={()=>TogglePasswordType()} >< FontAwesomeIcon  icon={faEye} /></span>:
                    <span onClick={()=>TogglePasswordType()} ><FontAwesomeIcon icon={faEyeSlash} /></span>}
                  </div>
                  {
                    errors.password&&( <p className="text-xs text-red-500 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {errors.password.message}
                    </p>)
                  }
                  <ul className="mt-2 px-4 grid sm:grid-cols-2 gap-y-1 gap-x-6 w-max list-disc">
                    <li className="text-xs text-orange-500">minimum 8 characters</li>
                    <li className="text-xs text-orange-500">one uppercase characters</li>
                    <li className="text-xs text-orange-500">one special characters</li>
                    <li className="text-xs text-orange-500">one number</li>
                   </ul>
                </div>
                <div className="flex items-center justify-between gap-2 mt-5">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a  className="text-blue-600 font-semibold text-sm hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="mt-12">
                  <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
              <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login