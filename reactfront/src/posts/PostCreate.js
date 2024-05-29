import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {
        const postData = {
            title,
            writer: '작성자', // 실제 사용자 정보를 입력하도록 수정 필요
            content
        };

        axios.post('/api/posts', postData)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error creating the post!', error);
            });
    };

    return (
        <div className="container col-md-8">
            <form>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        rows="10"
                        className="form-control"
                        id="content"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
            </form>
            <button type="button" onClick={handleSave} className="btn btn-primary bi bi-pencil-fill"> 작성</button>
            <a href="/" role="button" className="btn btn-info bi bi-arrow-return-left"> 목록</a>
        </div>
    );
};

export default PostCreate;
