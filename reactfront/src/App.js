import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import PostList from './posts/PostList';
import PostWrite from './posts/PostCreate';
import PostUpdate from './posts/PostUpdate';
import PostRead from './posts/PostRead';
import UserModify from './user/UserModify';
import UserJoin from './user/UserJoin';
import UserLogin from './user/Login';
import Header from './layout/Header';
import Footer from './layout/Footer';
import AdminPage from "./admin/AdminPage";
import IndexList from "./IndexList";
import PrivateRoute from './routes/PrivateRoute';
import Login from "./user/Login";
import axios from 'axios';
import ErrorBoundary from "./error/ErrorBoundary";

const AppContent = () => {
    const { setUser, setToken } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            setToken(token);
            setUser(user);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, [setUser, setToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ErrorBoundary>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/admin" element={
                    <PrivateRoute roles={['ADMIN']}>
                        <AdminPage />
                    </PrivateRoute>
                } />
                <Route path="/posts/list" element={
                    <PrivateRoute>
                        <PostList />
                    </PrivateRoute>
                } />
                <Route path="/posts/write" element={
                    <PrivateRoute>
                        <PostWrite />
                    </PrivateRoute>
                } />
                <Route path="/posts/update/:id" element={
                    <PrivateRoute>
                        <PostUpdate />
                    </PrivateRoute>
                } />
                <Route path="/posts/read/:id" element={
                    <PrivateRoute>
                        <PostReadWithUser />
                    </PrivateRoute>
                } />
                <Route path="/posts" element={
                    <PrivateRoute>
                        <IndexList />
                    </PrivateRoute>
                } />
                <Route path="/auth/modify" element={
                    <PrivateRoute>
                        <UserModify />
                    </PrivateRoute>
                } />
                <Route path="/auth/join" element={<UserJoin />} />
                <Route path="/auth/login" element={<UserLogin />} />
                <Route path="/forbidden" element={<div>접근이 금지되었습니다.</div>} />
                <Route path="/unverified" element={<div>승인이 필요합니다. 관리자에게 문의하세요.</div>} />
            </Routes>
            <Footer />
        </Router>
        </ErrorBoundary>
    );
};

const App = () => (
    <UserProvider>
        <AppContent />
    </UserProvider>
);

const PostReadWithUser = () => {
    const { user } = useUser();
    return <PostRead user={user} />;
};

export default App;
