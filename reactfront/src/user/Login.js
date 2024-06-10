import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
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
                alert('로그인 성공');
                console.log('로그인 응답:', response.data.user); // 로그로 응답 확인
                setUser(response.data.user); // 로그인 상태 업데이트
                navigate("/posts")
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
        <div id="posts_list">
            <div className="container col-md-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>

                    <span>
                        {error && <p id="valid" className="alert alert-danger">{error.exception}</p>}
                    </span>

                    <button type="submit" className="form-control btn btn-primary bi bi-lock-fill">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
