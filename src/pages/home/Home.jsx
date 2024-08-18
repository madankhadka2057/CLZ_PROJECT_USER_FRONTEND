
import { useEffect } from "react";
import Tostify from "../../global/Toastify/Tostify";
import ContactUs from "../contactus/ContactUs"
import Hero from "./Hero"
import OurFeatures from "./OurFeatures"

const Home = () => {
 
  return (
    <>
    
    <Hero/>
    <OurFeatures/>
    <ContactUs/>
    </>
  )
}

export default Home