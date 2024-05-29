import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../comment/Comments';
import CommentForm from '../comment/CommentForm';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const PostRead = ({ posts, user, isWriter }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (confirmDelete) {
            axios.delete(`/api/posts/${posts.id}`)
                .then(() => {
                    alert('게시글이 삭제되었습니다.');
                    navigate('/');
                })
                .catch(error => {
                    console.error('There was an error deleting the post!', error);
                });
        }
    };

    return (
        <>
            <Header />
            <br />
            <div id="posts_list">
                <div className="col-md-12">
                    <form className="card">
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="id">번호 : {posts.id}</label>
                            <input type="hidden" id="id" value={posts.id} />
                            <label htmlFor="createdDate">{posts.createdDate}</label>
                        </div>
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="writer">작성자 : {posts.writer}</label>
                            <label htmlFor="view"><i className="bi bi-eye-fill"> {posts.view}</i></label>
                        </div>
                        <div className="card-body">
                            <label htmlFor="title">제목</label>
                            <input type="text" className="form-control" id="title" value={posts.title} readOnly />
                            <br />
                            <label htmlFor="content">내용</label>
                            <textarea rows="5" className="form-control" id="content" readOnly>{posts.content}</textarea>
                        </div>
                    </form>

                    {/* Buttons */}
                    {user ? (
                        <>
                            <Link to="/" role="button" className="btn btn-info bi bi-arrow-return-left"> 목록</Link>
                            {isWriter && (
                                <>
                                    <Link to={`/posts/update/${posts.id}`} role="button" className="btn btn-primary bi bi-pencil-square"> 수정</Link>
                                    <button type="button" onClick={handleDelete} className="btn btn-danger bi bi-trash"> 삭제</button>
                                </>
                            )}
                        </>
                    ) : (
                        <Link to="/" role="button" className="btn btn-info bi bi-arrow-return-left"> 목록</Link>
                    )}

                    {/* Comments */}
                    <CommentList postId={posts.id} />
                    <CommentForm postId={posts.id} user={user} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostRead;
