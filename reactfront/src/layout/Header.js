import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

const Header = ({ user }) => {
    return (
        <>
            <div id="header" className="d-flex bd-highlight">
                <Link to="/" className="p-2 flex-grow-1 bd-highlight">Board Service</Link>
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
                            <a href="/logout" className="btn btn-outline-dark">로그아웃</a>
                            <a href="/modify" className="btn btn-outline-dark bi bi-gear"></a>
                        </>
                    ) : (
                        <>
                            <a href="/auth/login" role="button" className="btn btn-outline-dark bi bi-lock-fill"> 로그인</a>
                            <a href="/auth/join" role="button" className="btn btn-outline-dark bi bi-person-circle"> 회원가입</a>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
