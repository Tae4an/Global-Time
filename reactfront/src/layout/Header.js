import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import { useUser } from '../context/UserContext';

const Header = () => {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null); // 로그아웃 시 사용자 상태 초기화
        window.location.href = '/auth/login'; // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <>
            <div id="header" className="d-flex bd-highlight">
                <Link to="/" className="p-2 flex-grow-1 bd-highlight">Global Time</Link>
                <form action="/posts/search" method="GET" className="form-inline p-2 bd-highlight" role="search">
                    <input type="text" name="keyword" className="form-control" id="search" placeholder="검색" />
                    <button className="btn btn-success bi bi-search" type="submit"></button>
                </form>
            </div>

            <nav id="nav">
                <div className="text-right">
                    {user ? (
                        <>
                            <span className="mx-3">{user.nickname}님 안녕하세요!</span>
                            <button onClick={handleLogout} className="btn btn-outline-dark">로그아웃</button>
                            <Link to="/auth/modify" className="btn btn-outline-dark bi bi-gear"></Link>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" role="button" className="btn btn-outline-dark bi bi-lock-fill"> 로그인</Link>
                            <Link to="/auth/join" role="button" className="btn btn-outline-dark bi bi-person-circle"> 회원가입</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
