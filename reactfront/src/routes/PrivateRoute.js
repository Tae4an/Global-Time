import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useUser();

    if (!user) {
        // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return <Navigate to="/auth/login" />;
    }
    if (!user.verified) {
        // 사용자가 승인되지 않은 경우 접근 금지 페이지로 리다이렉트
        return <Navigate to="/unverified" />;
    }

    if (roles && roles.indexOf(user.role) === -1) {
        // 사용자의 역할이 허용된 역할 목록에 없는 경우 접근 금지 페이지로 리다이렉트
        return <Navigate to="/forbidden" />;
    }

    return children;
};

export default PrivateRoute;
