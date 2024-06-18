import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const IndexList = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => {
                console.log(response.data); // 디버깅을 위해 응답 데이터를 출력
                // 응답 데이터가 Page 객체일 경우 content를 사용하여 실제 데이터를 가져옴
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
        <div id="posts_list">
            <table id="table" className="table table-horizontal">
                <thead id="thead">
                <tr>
                    <th>{t('number')}</th>
                    <th className="col-md-6 text-center">{t('title')}</th>
                    <th>{t('writer')}</th>
                    <th>{t('createdDate')}</th>
                    <th>{t('views')}</th>
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
                <Link to="/posts/write" role="button" className="btn btn-primary bi bi-pencil-fill"> {t('write')}</Link>
            </div>
        </div>
    );
};

export default IndexList;
