import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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

const App = () => {
    useEffect(() => {

    }, []);

    return (
        <UserProvider>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<UserLogin />} />
                <Route path="/admin/user" element={<AdminPage />} />
                <Route path="/posts/list" element={<PostList />} />
                <Route path="/posts/write" element={<PostWrite />} />
                <Route path="/posts/update/:id" element={<PostUpdate />} />
                <Route path="/posts/read/:id" element={<PostRead />} />
                <Route path="/posts" element= {<IndexList/>}/>
                <Route path="/auth/modify" element={<UserModify />} />
                <Route path="/auth/join" element={<UserJoin />} />
                <Route path="/auth/login" element={<UserLogin />} />
            </Routes>
            <Footer />
        </Router>
        </UserProvider>
    );
};

export default App;
