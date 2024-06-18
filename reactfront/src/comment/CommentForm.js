import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import '../css/CommentForm.css';
import { useTranslation } from 'react-i18next';

const CommentForm = ({ postId, onCommentSubmit }) => {
    const { t } = useTranslation();
    const [comment, setComment] = useState('');
    const { user, token } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.nickname) {
            alert(t('loginRequired'));
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
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            const newComment = response.data;
            console.log(response.data);
            alert(t('submitSuccess'));
            setComment('');
            onCommentSubmit(newComment);
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
            alert(t('submitError', { message: error.response?.data?.message || error.message }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
                <label htmlFor="comment">{t('comment')}</label>
                <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('commentPlaceholder')}
                ></textarea>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">{t('submit')}</button>
            </div>
            <br/>
            <br/>
        </form>
    );
};

export default CommentForm;
