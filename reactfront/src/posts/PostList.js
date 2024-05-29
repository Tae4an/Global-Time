import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
