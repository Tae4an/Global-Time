import React, { useState } from 'react';

const UserJoin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [university, setUniversity] = useState('');
    const [nationality, setNationality] = useState('Korean');

    const openUniversitySearch = () => {
        const url = "/university/search";
        const name = "University Search";
        const specs = "width=600,height=400";
        window.open(url, name, specs);
    };

    return (
        <div id="posts_list">
            <div className="container col-md-4">
                <form action="/auth/joinProc" method="post">
                    <input type="hidden" name="_csrf" value="{{_csrf.token}}" />
                    <div className="form-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="아이디를 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="form-control"
                            placeholder="닉네임을 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="이메일을 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>대학교</label>
                        <div className="input-group">
                            <input
                                type="text"
                                name="university"
                                id="university"
                                value={university}
                                className="form-control"
                                placeholder="대학교를 선택해주세요"
                                readOnly
                            />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary" onClick={openUniversitySearch}>검색</button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>국적</label>
                        <select
                            name="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="form-control"
                        >
                            <option value="Korean">Korean</option>
                            <option value="Foreigner">Foreigner</option>
                            <option value="American">American</option>
                            <option value="Canadian">Canadian</option>
                            {/* Add more nationalities as needed */}
                        </select>
                    </div>

                    <button className="btn btn-primary bi bi-person">가입</button>
                    <a href="/" role="button" className="btn btn-info bi bi-arrow-return-left">목록</a>
                </form>
            </div>
        </div>
    );
};

export default UserJoin;
