import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/posts', {
                params: { page: 0, keyword: '' },
                // headers: { Authorization: `Bearer ${token}` }, // 필요시 추가
                withCredentials: true, // CORS 문제 해결을 위해 자격 증명 포함
            });
            setPosts(response.data.content);
        } catch (error) {
            setError(error);
            console.error("There was an error fetching the posts!", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchPosts();
        };
        fetchData().catch(console.error);
    }, []);

    if (error) {
        return <div>There was an error fetching the posts: {error.message}</div>;
    }

    if (loading) {
        return <div>Loading......</div>;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div className="post-card" key={post.id}>
                    {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.title} />
                    ) : (
                        <div className="no-image"></div>
                    )}
                    <div className="post-card-content">
                        <div className="post-card-title">{post.title}</div>
                        <div className="post-card-description">{post.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
