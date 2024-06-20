import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import '../css/PostCreate.css'

const PostCreate = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!user || !user.username) {
            alert(t('loginRequired'));
            return;
        }

        const postData = {
            title,
            content,
            writer: user.nickname,
        };

        try {
            await axios.post('/api/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(t('createSuccess'));
            navigate('/posts');
        } catch (error) {
            console.error(t('createError'), error);
            alert(`${t('createError')}: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="container col-md-8 mt-5">
            <form>
                <div className="form-group">
                    <label htmlFor="title">{t('title')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder={t('titlePlaceholder')}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">{t('content')}</label>
                    <textarea
                        rows="10"
                        className="form-control"
                        id="content"
                        placeholder={t('contentPlaceholder')}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
            </form>
            <div className="d-flex justify-content-end">
                <button type="button" onClick={handleSave} className="btn btn-primary bi bi-pencil-fill"> {t('create')}</button>
                <a href="/posts" role="button" className="btn btn-info bi bi-arrow-return-left"> {t('list')}</a>
            </div>
        </div>
    );
};

export default PostCreate;
