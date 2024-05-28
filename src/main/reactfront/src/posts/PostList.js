import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = () => {
        axios.get(`/api/posts?page=${page}&keyword=${keyword}`)
            .then(response => {
                setPosts(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchPosts();
    };

    return (
        <>
            <Header />
            <div id="posts_list">
                <div className="container col-md-8">
                    <form onSubmit={handleSearch} className="form-inline p-2 bd-highlight" role="search">
                        <input
                            type="text"
                            name="keyword"
                            className="form-control"
                            id="search"
                            placeholder="검색"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button className="btn btn-success bi bi-search" type="submit"></button>
                    </form>
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
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostList;
