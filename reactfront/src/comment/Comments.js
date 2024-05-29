import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // 필요에 따라 스타일 파일 추가

const Comments = ({ postId, user }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/posts/${postId}/comments`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the comments!", error);
            });
    }, [postId]);

    const handleDelete = (postId, commentId, writerUserId, sessionUserId) => {
        if (writerUserId !== sessionUserId) {
            alert("본인이 작성한 댓글만 삭제 가능합니다.");
            return;
        }

        axios.delete(`/api/posts/${postId}/comments/${commentId}`)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
                alert('댓글이 삭제되었습니다.');
            })
            .catch(error => {
                console.error("There was an error deleting the comment!", error);
            });
    };

    const handleUpdate = (commentId) => {
        const form = document.querySelector(`#form-${commentId}`);
        const data = {
            id: form.querySelector('#id').value,
            postsId: form.querySelector('#postsId').value,
            comment: form.querySelector('#comment-content').value,
            writerUserId: form.querySelector('#writerUserId').value,
            sessionUserId: form.querySelector('#sessionUserId').value
        };

        if (data.writerUserId !== data.sessionUserId) {
            alert("본인이 작성한 댓글만 수정 가능합니다.");
            return;
        }

        if (!data.comment || data.comment.trim() === "") {
            alert("공백 또는 입력하지 않은 부분이 있습니다.");
            return;
        }

        axios.put(`/api/posts/${data.postsId}/comments/${data.id}`, data)
            .then(() => {
                setComments(comments.map(comment => comment.id === data.id ? { ...comment, comment: data.comment } : comment));
                alert('댓글이 수정되었습니다.');
            })
            .catch(error => {
                console.error("There was an error updating the comment!", error);
            });
    };

    return (
        <div className="card">
            <div className="card-header bi bi-chat-dots"> {comments.length} Comments</div>
            <ul className="list-group-flush">
                {comments.map(comment => (
                    <li key={comment.id} id={`comments-${comment.id}`} className="list-group-item">
                        <span>
                            <span style={{ fontSize: 'small' }}>{comment.nickname}</span>
                            <span style={{ fontSize: 'xx-small' }}>{comment.createdDate}</span>
                        </span>
                        {comment.isWrite() && (
                            <>
                                <button type="button" data-toggle="collapse" data-target={`.multi-collapse-${comment.id}`} className="bi bi-pencil-square"></button>
                                <button type="button" onClick={() => handleDelete(postId, comment.id, comment.userinfo, user.id)} className="bi bi-x-square"></button>
                            </>
                        )}
                        <p className={`collapse multi-collapse-${comment.id} show`}>{comment.comment}</p>
                        <form id={`form-${comment.id}`} className={`collapse multi-collapse-${comment.id}`}>
                            <input type="hidden" id="id" value={comment.id} />
                            <input type="hidden" id="postsId" value={postId} />
                            <input type="hidden" id="writerUserId" value={comment.userinfo} />
                            <input type="hidden" id="sessionUserId" value={user.id} />
                            <div className="form-group">
                                <textarea className="form-control" id="comment-content" rows="3">{comment.comment}</textarea>
                            </div>
                            <button type="button" onClick={() => handleUpdate(comment.id)} className="btn btn-outline-primary bi bi-pencil-square"> 수정</button>
                        </form>
                    </li>
                ))}
            </ul>
            <br />
        </div>
    );
};

export default Comments;