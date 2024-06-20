import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // 추가된 CSS 파일

const Login = ({ error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/loginProc', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                alert(`로그인 실패: ${response.data.message}`);
            } else {
                // 관리자 계정 확인 후 별도의 알림 표시
                if (response.data.user.role === 'ADMIN') {
                    alert('관리자 계정으로 로그인했습니다.');
                } else {
                    alert('로그인 성공');
                }
                console.log('로그인 응답:', response.data.user);
                setUser(response.data.user);
                setToken(response.data.token);

                // 로컬 스토리지에 사용자 정보와 토큰 저장
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);

                navigate("/posts");
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || '로그인 중 오류가 발생했습니다.';
                alert(`로그인 실패: ${errorMessage}`);
            } else {
                console.error('Error during login', error);
                alert('로그인 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div id="login-page" className="d-flex justify-content-center align-items-center">
            <div className="login-container col-md-6">
                <form onSubmit={handleSubmit} className="login-form card p-4 shadow">
                    <h3 className="text-center mb-4">로그인</h3>
                    <div className="form-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>

                    <span>
                        {error && <p id="valid" className="alert alert-danger">{error.exception}</p>}
                    </span>

                    <button type="submit" className="btn btn-primary btn-block bi bi-lock-fill">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
