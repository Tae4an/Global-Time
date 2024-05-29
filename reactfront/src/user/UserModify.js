import React, { useState } from 'react';

const UserModify = ({ user }) => {
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState(user.nickname);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 추가적인 수정 로직을 여기에 구현
    };

    return (
        <div id="posts_list">
            <div className="container col-md-4">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" id="id" value={user.id} />
                    <input type="hidden" id="modifiedDate" value={user.modifiedDate} />
                    <div className="form-group">
                        <label htmlFor="username">아이디</label>
                        <input type="text" id="username" value={user.username} className="form-control" readOnly />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="수정할 비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            type="text"
                            id="nickname"
                            className="form-control"
                            placeholder="수정할 닉네임을 입력해주세요"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" value={user.email} className="form-control" readOnly />
                    </div>
                    <button type="submit" id="btn-user-modify" className="btn btn-primary bi bi-check-lg">완료</button>
                    <a href="/" role="button" className="btn btn-info bi bi-arrow-return-left">목록</a>
                </form>
            </div>
        </div>
    );
};

export default UserModify;
