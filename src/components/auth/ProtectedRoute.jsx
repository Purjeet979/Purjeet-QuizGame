import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isUserLoggedIn, getUserRoles } from '../../utils/authService';

const ProtectedRoute = ({ children, roles }) => {
    const isLoggedIn = isUserLoggedIn();
    const userRoles = getUserRoles();
    const location = useLocation();

    // 1. Check if the user is logged in
    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check if the route requires specific roles and if the user has one of them
    if (roles && !roles.some(role => userRoles.includes(role))) {
        // Redirect them to the home page if they don't have the required role
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 3. If all checks pass, render the component they were trying to access
    return children;
};

export default ProtectedRoute;