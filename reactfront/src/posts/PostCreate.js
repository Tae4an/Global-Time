import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!user || !user.username) {
            alert('로그인이 필요합니다.');
            return;
        }

        const postData = {
            title,
            content,
            writer: user.nickname,
        };

        try {
            await axios.post('/api/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("게시글이 등록 됐습니다.");
            navigate('/posts');
        } catch (error) {
            console.error('There was an error creating the post!', error);
            alert(`글 작성 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
        }
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
            <a href="/posts" role="button" className="btn btn-info bi bi-arrow-return-left"> 목록</a>
        </div>
    );
};

export default PostCreate;
