import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Comment.css';

const Comments = ({ postId, user }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}/comments`);
                console.log(response.data); // 댓글 데이터를 콘솔에 출력
                setComments(response.data);
            } catch (error) {
                console.error('There was an error fetching the comments!', error);
            }
        };

        fetchComments();
    }, [postId]);

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
                        <p>{comment.comment}</p>
                    </div>
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
