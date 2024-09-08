import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '~/helpers/common';
import { logout } from '~/redux/actions/authAction';

const PublicRouter = ({ children }) => {
    const dispatch = useDispatch();
    const jwtToken = useSelector((state) => state.jwtAuthReducer.token);
    const isAuthenticated = useSelector((state) => state.jwtAuthReducer.isAuthenticated);
    if (isAuthenticated) {
        if (isTokenExpired(jwtToken)) {
            dispatch(logout());
            return <Navigate to="/login" />;
        } else {
            return <Navigate to="/" />;
        }
    } else {
        return children;
    }
};

export default PublicRouter;
