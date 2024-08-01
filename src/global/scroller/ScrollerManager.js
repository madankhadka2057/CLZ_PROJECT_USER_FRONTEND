import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollerManager = () => {
  const location =useLocation()
 
  useEffect(()=>{
    window.scrollTo({top:0})
    // console.log("Location:-"+location.pathname)
  },[location.pathname])
  
}

export default ScrollerManager