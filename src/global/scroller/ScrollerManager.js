import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollerManager = () => {
  const location =useLocation()
 
  useEffect(()=>{
    window.scrollTo({top:0})
  },[location.pathname])
  
  console.log(window.innerHeight)
  console.log(window.outerHeight)

}

export default ScrollerManager