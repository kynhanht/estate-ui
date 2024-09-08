import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.jwtAuthReducer.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
