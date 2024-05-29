import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostUpdate = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
    }, [id]);

    const handleUpdate = () => {
        const postData = {
            title,
            content
        };

        axios.put(`/api/posts/${id}`, postData)
            .then(() => {
                navigate(`/posts/read/${id}`);
            })
            .catch(error => {
                console.error('There was an error updating the post!', error);
            });
    };

    return (
        <div className="col-md-12">
            <form className="card">
                <div className="card-header d-flex justify-content-between">
                    <label htmlFor="id">번호 : {id}</label>
                    <input type="hidden" id="id" value={id} />
                </div>
                <div className="card-body">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="card-body">
                    <label htmlFor="content">내용</label>
                    <textarea
                        rows="5"
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
            </form>
            <a href={`/posts/read/${id}`} role="button" className="btn btn-info bi bi-arrow-return-left"> 취소</a>
            <button type="button" onClick={handleUpdate} className="btn btn-primary bi bi-pencil-square"> 완료</button>
        </div>
    );
};

export default PostUpdate;
