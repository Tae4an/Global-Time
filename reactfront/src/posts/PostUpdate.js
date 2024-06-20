import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import '../css/PostUpdate.css';

const PostUpdate = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const nationalityToLanguage = {
        Korea: 'ko',       // 한국어
        Japan: 'ja',       // 일본어
        UnitedStates: 'en' // 영어
    };

    useEffect(() => {
        if (user && user.user && user.user.nationality) {
            const language = nationalityToLanguage[user.user.nationality] || 'ko';
            i18n.changeLanguage(language);
        } else {
            i18n.changeLanguage('ko'); // 기본 언어를 한국어로 설정
        }
    }, [user, i18n]);

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(error => {
                console.error(t('errorFetchingPost'), error);
            });
    }, [id, t]);

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
        <div id="post-update-page" className="d-flex justify-content-center align-items-center">
            <div className="update-container col-md-8">
                <h2 className="text-center mb-4">{t('updatePost')}</h2>
                <form className="card p-4 shadow">
                    <div className="card-header d-flex justify-content-between">
                        <label htmlFor="id">{t('number')} : {id}</label>
                        <input type="hidden" id="id" value={id} />
                    </div>
                    <div className="card-body">
                        <label htmlFor="title">{t('title')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="card-body">
                        <label htmlFor="content">{t('content')}</label>
                        <textarea
                            rows="5"
                            className="form-control"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                </form>
                <div className="d-flex justify-content-between mt-3">
                    <a href={`/posts/read/${id}`} role="button" className="btn btn-info bi bi-arrow-return-left"> {t('cancel')}</a>
                    <button type="button" onClick={handleUpdate} className="btn btn-primary bi bi-pencil-square"> {t('update')}</button>
                </div>
            </div>
        </div>
    );
};

export default PostUpdate;
