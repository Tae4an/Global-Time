import React, { useState } from 'react';

const CommentForm = ({ posts, user }) => {
    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSave = () => {
        // 여기에 댓글 저장 로직 추가
        console.log(`Saving comment for post ID ${posts.id}: ${comment}`);
    };

    return (
        <div className="card">
            <div className="card-header bi bi-chat-right-dots">Write a Comment</div>
            <form>
                <input type="hidden" id="postsId" value={posts.id} />
                {user ? (
                    <>
                        <div className="card-body">
              <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  placeholder="댓글을 입력하세요"
                  value={comment}
                  onChange={handleChange}
              />
                        </div>
                        <div className="card-footer">
                            <button
                                type="button"
                                id="btn-comment-save"
                                className="btn btn-outline-primary bi bi-pencil-square"
                                onClick={handleSave}
                            >
                                등록
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="card-body" style={{ fontSize: 'small' }}>
                        <a href="/auth/login">로그인</a>을 하시면 댓글을 등록할 수 있습니다.
                    </div>
                )}
            </form>
        </div>
    );
};

export default CommentForm;
