import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../comment/Comments';
import CommentForm from '../comment/CommentForm';

const PostRead = ({ user }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                setError(error);
                console.error("There was an error fetching the post!", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/posts/${id}`)
                .then(() => {
                    alert('게시글이 삭제되었습니다.');
                    navigate('/posts');
                })
                .catch(error => {
                    console.error('There was an error deleting the post!', error);
                });
        }
    };

    if (error) {
        return <div>There was an error fetching the post: {error.message}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    const isWriter = user && user.nickname === post.writer;

    return (
        <>
            <br />
            <div id="posts_list">
                <div className="col-md-12">
                    <form className="card">
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="id">번호 : {post.id}</label>
                            <input type="hidden" id="id" value={post.id} />
                            <label htmlFor="createdDate">{post.createdDate}</label>
                        </div>
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="writer">작성자 : {post.writer}</label>
                            <label htmlFor="view"><i className="bi bi-eye-fill"> {post.view}</i></label>
                        </div>
                        <div className="card-body">
                            <label htmlFor="title">제목</label>
                            <input type="text" className="form-control" id="title" value={post.title} readOnly />
                            <br />
                            <label htmlFor="content">내용</label>
                            <textarea rows="5" className="form-control" id="content" defaultValue={post.content} readOnly></textarea>
                        </div>
                    </form>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-2">
                        <Link to="/posts" role="button" className="btn btn-info bi bi-arrow-return-left"> 목록</Link>
                        <div>
                            {isWriter && (
                                <>
                                    <Link to={`/posts/update/${post.id}`} role="button" className="btn btn-primary bi bi-pencil-square mx-1"> 수정</Link>
                                    <button type="button" onClick={handleDelete} className="btn btn-danger bi bi-trash mx-1"> 삭제</button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Comments */}
                    <Comments postId={post.id} user={user} />
                    <CommentForm postId={post.id} />
                </div>
            </div>
        </>
    );
};

export default PostRead;
