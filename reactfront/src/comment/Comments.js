import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Comment.css';

const Comments = ({ postId, user }) => {
    const [comments, setComments] = useState([]);
    const [translatedComments, setTranslatedComments] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('There was an error fetching the comments!', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleTranslate = async (commentId, commentText) => {
        const targetLanguage = user.nationality === 'Korea' ? 'en' : 'ko';  // 사용자의 국적에 따라 언어 설정
        console.log(`Translating comment to: ${targetLanguage}`);
        try {
            const response = await axios.post('http://127.0.0.1:5000/translate', {
                text: commentText,
                target_language: targetLanguage
            });
            console.log(`Translated comment: ${response.data.translated_text}`);
            setTranslatedComments(prevState => ({
                ...prevState,
                [commentId]: response.data.translated_text
            }));
        } catch (error) {
            console.error('Translation error:', error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    return (
        <div className="comments-container">
            {comments.map(comment => (
                <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                        <span className="comment-author">{comment.nickname}</span>
                        <span className="comment-date">{comment.createdDate}</span>
                    </div>
                    <div className="comment-body">
                        <p>{translatedComments[comment.id] || comment.comment}</p>
                    </div>
                    <button onClick={() => handleTranslate(comment.id, comment.comment)} className="btn btn-secondary btn-sm">번역 보기</button>
                    {user && user.nickname === comment.nickname && (
                        <div className="comment-actions">
                            <button onClick={() => handleDelete(comment.id)} className="btn btn-danger btn-sm">삭제</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;
