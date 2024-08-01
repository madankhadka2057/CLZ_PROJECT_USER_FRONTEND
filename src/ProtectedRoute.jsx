import React from 'react'
import { Navigate, Outlet,  } from 'react-router-dom'
import Cart from './pages/Cart/Cart'

const ProtectedRoute = () => {
    const token=localStorage.getItem('token')
    if(token){
        console.log("madan")
        return <Outlet/>
    }else{
        return <Navigate to="/login" replace />
    }

}

export default ProtectedRoute