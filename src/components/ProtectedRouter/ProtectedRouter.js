import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccessDenied from '~/pages/AccessDenied';

const ProtectedRouter = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.jwtAuthReducer.isAuthenticated);
    const jwtToken = useSelector((state) => state.jwtAuthReducer.token);
    const roleCode = useSelector((state) => state.jwtAuthReducer.roleCode);
    const isManager = jwtToken && roleCode === 'ROLE_MANAGER';
    if (isAuthenticated) {
        if (isManager) {
            return children;
        } else {
            return <AccessDenied />;
        }
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRouter;
