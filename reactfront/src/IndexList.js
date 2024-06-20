import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './css/IndexList.css';

const IndexList = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => {
                console.log(response.data); // 디버깅을 위해 응답 데이터를 출력
                if (response.data && response.data.content) {
                    setPosts(response.data.content);
                } else {
                    setPosts([]);
                }
            })
            .catch(error => {
                setError(error);
                console.error(t('fetchError'), error);
            });
    }, [t]);

    if (error) {
        return <div>{t('fetchError')}: {error.message}</div>;
    }

    return (
        <div className="posts-container">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <div className="post-card-body">
                        <h5 className="post-card-title">
                            <Link to={`/posts/read/${post.id}`}>{post.title}</Link>
                        </h5>
                        <p className="post-card-text">{post.content.substring(0, 100)}...</p>
                    </div>
                    <div className="post-card-footer">
                        <span>{post.writer}</span>
                        <span>{post.createdDate}</span>
                        <span><i className="bi bi-eye-fill"></i> {post.view}</span>
                    </div>
                </div>
            ))}
            <Link to="/posts/write" role="button" className="btn btn-primary bi bi-pencil-fill write-button"></Link>
        </div>
    );
};

export default IndexList;
