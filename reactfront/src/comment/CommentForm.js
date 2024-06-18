import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import '../css/CommentForm.css';

const CommentForm = ({ postId, onCommentSubmit }) => {
    const [comment, setComment] = useState('');
    const { user, token } = useUser(); // 인증 토큰도 가져옵니다.

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.nickname) {
            alert('로그인이 필요합니다.');
            return;
        }

        const commentData = {
            comment,
            user: {
                nickname: user.nickname
            },
            posts: {
                id: postId
            }
        };

        try {
            const response = await axios.post(`/api/posts/${postId}/comments`, commentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 인증 토큰을 헤더에 포함합니다.
                },
                withCredentials: true // CORS 문제 해결을 위해 자격 증명 포함
            });
            const newComment = response.data; // 서버로부터 새 댓글 객체를 받아옴
            console.log(response.data);
            alert('댓글이 등록되었습니다.');
            setComment('');
            onCommentSubmit(newComment); // 새 댓글 객체를 상위 컴포넌트로 전달
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
            alert(`댓글 작성 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
                <label htmlFor="comment">댓글</label>
                <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">댓글 작성</button>
            </div>
            <br/>
            <br/>
        </form>
    );
};

export default CommentForm;
