import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const nationalityToLanguage = {
        Korea: 'ko',       // 한국어
        Japan: 'ja',       // 일본어
        China: 'zh-CN',    // 중국어 (간체)
        UnitedStates: 'en' // 영어
    };

    useEffect(() => {
        if (user) {
            const language = nationalityToLanguage[user.user.nationality] || 'ko';
            i18n.changeLanguage(language);
        } else {
            i18n.changeLanguage('ko'); // 기본 언어를 한국어로 설정
        }
    }, [user, i18n]);

    const handleLogout = () => {
        alert(t('logout'));
        logout();
        navigate('/');
    };

    return (
        <>
            <div id="header" className="d-flex bd-highlight">
                <Link to="/posts" className="p-2 flex-grow-1 bd-highlight">Global Time</Link>
                <form action="/posts/search" method="GET" className="form-inline p-2 bd-highlight" role="search">
                    <input type="text" name="keyword" className="form-control" id="search" placeholder={t('search')} />
                    <button className="btn btn-success bi bi-search" type="submit"></button>
                </form>
            </div>

            <nav id="nav" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse justify-content-end">
                    {user ? (
                        <>
                            <span className="mx-3">{t('greeting', { name: user.realName })}</span>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="btn btn-outline-dark mx-1">{t('admin')}</Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-outline-dark mx-1">{t('logout')}</button>
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
