import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IndexList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the posts!", error);
            });
    }, []);

    return (
        <div id="posts_list">
            <table id="table" className="table table-horizontal">
                <thead id="thead">
                <tr>
                    <th>번호</th>
                    <th className="col-md-6 text-center">제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody id="tbody">
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td><Link to={`/posts/read/${post.id}`}>{post.title}</Link></td>
                        <td>{post.writer}</td>
                        <td>{post.createdDate}</td>
                        <td>{post.view}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="text-right">
                <Link to="/posts/write" role="button" className="btn btn-primary bi bi-pencil-fill"> 글쓰기</Link>
            </div>
        </div>
    );
};

export default IndexList;
