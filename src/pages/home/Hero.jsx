
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Tostify from "../../global/Toastify/Tostify";
function Hero() {
  const navigate=useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    cssEase: "ease-out"
    // cssEase: `cubic-bezier(0.25, 0.1, 0.25, 1.0) (default ease)`
  };
  
  return (
    <div className="  slider-container relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <div className="w-full h-full absolute inset-0">
        <Slider {...settings} className=" h-auto ">
 
          <img src="assets/slider_bg_1.jpg" alt="Background Image 1" className="object-cover object-center sm:h-screen lg:w-screen lg:h-screen" />
          <img src="assets/food_background4.jpg" alt="Background Image 2" className="object-cover object-center lg:w-screen lg:h-screen" />

          <img src="assets/image.png" alt="Background Image 2" className="object-cover object-center lg:w-screen lg:h-screen" />

        </Slider>
        {/* <img src="assets/slider_bg_1.jpg" alt="Background Image 1" className="object-cover object-center w-full h-full" /> */}

        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-5 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
        <p className="text-lg text-gray-300 mb-8">Discover amazing features and services that await you.</p>
        <a  onClick={()=>navigate("/product")} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</a>
      </div>
    </div>
  )
}

export default Hero