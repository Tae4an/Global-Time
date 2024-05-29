import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './posts/PostList';
import PostWrite from './posts/PostCreate';
import PostUpdate from './posts/PostUpdate';
import PostRead from './posts/PostRead';
import UserModify from './user/UserModify';
import UserJoin from './user/UserJoin';
import UserLogin from './user/Login';
import UniversitySearch from './university/UniversitySearch';
import Header from './layout/Header';
import Footer from './layout/Footer';

const App = () => {
    useEffect(() => {
        // 초기화 작업이 필요할 경우 여기에 추가
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<PostList />} />
                <Route path="/posts/write" element={<PostWrite />} />
                <Route path="/posts/update/:id" element={<PostUpdate />} />
                <Route path="/posts/read/:id" element={<PostRead />} />
                <Route path="/auth/modify" element={<UserModify />} />
                <Route path="/auth/join" element={<UserJoin />} />
                <Route path="/auth/login" element={<UserLogin />} />
                <Route path="/university/search" element={<UniversitySearch />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
