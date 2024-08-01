import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

    // If the token does not exist, render the children components (Outlet)
    return <Outlet />;
};

export default RedirectIfAuthenticated;
