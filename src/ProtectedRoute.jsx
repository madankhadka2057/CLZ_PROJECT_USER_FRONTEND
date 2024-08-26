import React from 'react'
import { Navigate, Outlet,  } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import {jwtDecode} from 'jwt-decode'
const ProtectedRoute = () => {
    const token=localStorage.getItem('token')
    if(token){
        var decotedToken=jwtDecode(token)
    }
    if(token && (decotedToken.role=="user")){
        return <Outlet/>
    }else{
        return <Navigate to="/login" replace />
    }

}

export default ProtectedRoute