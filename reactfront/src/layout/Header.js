import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import { useUser } from '../context/UserContext';

const Header = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("로그아웃 되었습니다.");
        logout();
        navigate('/');
    };

    if (user) {
        console.log("User object:", user);
    }

    return (
        <>
            <div id="header" className="d-flex bd-highlight">
                <Link to="/posts" className="p-2 flex-grow-1 bd-highlight">Global Time</Link>
                <form action="/posts/search" method="GET" className="form-inline p-2 bd-highlight" role="search">
                    <input type="text" name="keyword" className="form-control" id="search" placeholder="검색" />
                    <button className="btn btn-success bi bi-search" type="submit"></button>
                </form>
            </div>

            <nav id="nav" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse justify-content-end">
                    {user ? (
                        <>
                            <span className="mx-3">{user.realName}님 안녕하세요!</span>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="btn btn-outline-dark mx-1">관리자</Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-outline-dark mx-1">로그아웃</button>
                            <Link to="/auth/modify" className="btn btn-outline-dark bi bi-gear mx-1"></Link>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" role="button" className="btn btn-outline-dark bi bi-lock-fill mx-1"> 로그인</Link>
                            <Link to="/auth/join" role="button" className="btn btn-outline-dark bi bi-person-circle mx-1"> 회원가입</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
