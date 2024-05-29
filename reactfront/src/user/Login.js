import React, { useState } from 'react';

const Login = ({ csrfToken, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 추가적인 로그인 로직을 여기에 구현
    };

    return (
        <div id="posts_list">
            <div className="container col-md-6">
                <form action="/auth/loginProc" method="post" onSubmit={handleSubmit}>
                    <input type="hidden" name="_csrf" value={csrfToken} />
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
