import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Comment.css';
import CommentForm from './CommentForm';
import { useTranslation } from 'react-i18next';

const Comments = ({ postId, userId }) => {
    const { t } = useTranslation();
    const [comments, setComments] = useState([]);
    const [translatedComments, setTranslatedComments] = useState({});
    const [showOriginalComments, setShowOriginalComments] = useState({});
    const [user, setUser] = useState(null);

    const nationalityToLanguage = {
        Afghanistan: 'fa',
        Albania: 'sq',
        Algeria: 'ar',
        Andorra: 'ca',
        Angola: 'pt',
        AntiguaandBarbuda: 'en',
        Argentina: 'es',
        Armenia: 'hy',
        Australia: 'en',
        Austria: 'de',
        Azerbaijan: 'az',
        Bahamas: 'en',
        Bahrain: 'ar',
        Bangladesh: 'bn',
        Barbados: 'en',
        Belarus: 'be',
        Belgium: 'nl',
        Belize: 'en',
        Benin: 'fr',
        Bhutan: 'dz',
        Bolivia: 'es',
        BosniaandHerzegovina: 'bs',
        Botswana: 'en',
        Brazil: 'pt',
        BruneiDarussalam: 'ms',
        Bulgaria: 'bg',
        BurkinaFaso: 'fr',
        Burundi: 'fr',
        CaboVerde: 'pt',
        Cambodia: 'km',
        Cameroon: 'fr',
        Canada: 'en',
        CentralAfricanRepublic: 'fr',
        Chad: 'fr',
        Chile: 'es',
        China: 'zh-CN',
        Colombia: 'es',
        Comoros: 'ar',
        CongoDemocraticRepublicofthe: 'fr',
        CongoRepublicofthe: 'fr',
        CostaRica: 'es',
        Croatia: 'hr',
        Cuba: 'es',
        Cyprus: 'el',
        CzechRepublic: 'cs',
        Denmark: 'da',
        Djibouti: 'fr',
        Dominica: 'en',
        DominicanRepublic: 'es',
        Ecuador: 'es',
        Egypt: 'ar',
        ElSalvador: 'es',
        EquatorialGuinea: 'es',
        Eritrea: 'ti',
        Estonia: 'et',
        Eswatini: 'en',
        Ethiopia: 'am',
        Fiji: 'en',
        Finland: 'fi',
        France: 'fr',
        Gabon: 'fr',
        Gambia: 'en',
        Georgia: 'ka',
        Germany: 'de',
        Ghana: 'en',
        Greece: 'el',
        Grenada: 'en',
        Guatemala: 'es',
        Guinea: 'fr',
        GuineaBissau: 'pt',
        Guyana: 'en',
        Haiti: 'fr',
        Honduras: 'es',
        Hungary: 'hu',
        Iceland: 'is',
        India: 'hi',
        Indonesia: 'id',
        Iran: 'fa',
        Iraq: 'ar',
        Ireland: 'en',
        Israel: 'he',
        Italy: 'it',
        Jamaica: 'en',
        Japan: 'ja',
        Jordan: 'ar',
        Kazakhstan: 'kk',
        Kenya: 'sw',
        Kiribati: 'en',
        Korea: 'ko',
        Kosovo: 'sq',
        Kuwait: 'ar',
        Kyrgyzstan: 'ky',
        Laos: 'lo',
        Latvia: 'lv',
        Lebanon: 'ar',
        Lesotho: 'en',
        Liberia: 'en',
        Libya: 'ar',
        Liechtenstein: 'de',
        Lithuania: 'lt',
        Luxembourg: 'lb',
        Madagascar: 'mg',
        Malawi: 'en',
        Malaysia: 'ms',
        Maldives: 'dv',
        Mali: 'fr',
        Malta: 'mt',
        MarshallIslands: 'en',
        Mauritania: 'ar',
        Mauritius: 'mfe',
        Mexico: 'es',
        Micronesia: 'en',
        Moldova: 'ro',
        Monaco: 'fr',
        Mongolia: 'mn',
        Montenegro: 'sr',
        Morocco: 'ar',
        Mozambique: 'pt',
        Myanmar: 'my',
        Namibia: 'en',
        Nauru: 'en',
        Nepal: 'ne',
        Netherlands: 'nl',
        NewZealand: 'en',
        Nicaragua: 'es',
        Niger: 'fr',
        Nigeria: 'en',
        NorthMacedonia: 'mk',
        Norway: 'no',
        Oman: 'ar',
        Pakistan: 'ur',
        Palau: 'en',
        Panama: 'es',
        PapuaNewGuinea: 'en',
        Paraguay: 'gn',
        Peru: 'es',
        Philippines: 'tl',
        Poland: 'pl',
        Portugal: 'pt',
        Qatar: 'ar',
        Romania: 'ro',
        Russia: 'ru',
        Rwanda: 'rw',
        SaintKittsandNevis: 'en',
        SaintLucia: 'en',
        SaintVincentandtheGrenadines: 'en',
        Samoa: 'sm',
        SanMarino: 'it',
        SaoTomeandPrincipe: 'pt',
        SaudiArabia: 'ar',
        Senegal: 'fr',
        Serbia: 'sr',
        Seychelles: 'fr',
        SierraLeone: 'en',
        Singapore: 'en',
        Slovakia: 'sk',
        Slovenia: 'sl',
        SolomonIslands: 'en',
        Somalia: 'so',
        SouthAfrica: 'af',
        SouthSudan: 'en',
        Spain: 'es',
        SriLanka: 'si',
        Sudan: 'ar',
        Suriname: 'nl',
        Sweden: 'sv',
        Switzerland: 'de',
        Syria: 'ar',
        Taiwan: 'zh-TW',
        Tajikistan: 'tg',
        Tanzania: 'sw',
        Thailand: 'th',
        TimorLeste: 'pt',
        Togo: 'fr',
        Tonga: 'to',
        TrinidadandTobago: 'en',
        Tunisia: 'ar',
        Turkey: 'tr',
        Turkmenistan: 'tk',
        Tuvalu: 'en',
        Uganda: 'en',
        Ukraine: 'uk',
        UnitedArabEmirates: 'ar',
        UnitedKingdom: 'en',
        UnitedStates: 'en',
        Uruguay: 'es',
        Uzbekistan: 'uz',
        Vanuatu: 'bi',
        Vatican: 'la',
        Venezuela: 'es',
        Vietnam: 'vi',
        Yemen: 'ar',
        Zambia: 'en',
        Zimbabwe: 'en'
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('There was an error fetching the comments!', error);
            }
        };

        const fetchUser = async () => {
            if (!userId) {
                console.warn('User ID is not provided');
                return;
            }else
                console.log(userId);
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('There was an error fetching the user!', error);
            }
        };

        fetchComments();
        fetchUser();
    }, [postId, userId]);

    const handleTranslate = async (commentId, commentText) => {
        if (!user) {
            console.error('User data not loaded');
            return;
        }

        if (showOriginalComments[commentId]) {
            setShowOriginalComments(prevState => ({
                ...prevState,
                [commentId]: false
            }));
        } else {
            const targetLanguage = nationalityToLanguage[user.nationality] || 'ko';
            console.log(`Translating comment to: ${targetLanguage}`);
            try {
                const response = await axios.post('http://127.0.0.1:5000/translate', {
                    text: commentText,
                    target_language: targetLanguage
                });
                console.log(`Translated comment: ${response.data.translated_text}`);
                setTranslatedComments(prevState => ({
                    ...prevState,
                    [commentId]: response.data.translated_text
                }));
                setShowOriginalComments(prevState => ({
                    ...prevState,
                    [commentId]: true
                }));
            } catch (error) {
                console.error('Translation error:', error);
            }
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    const addComment = async (newCommentId) => {
        try {
            const response = await axios.get(`/api/posts/${postId}/comments/${newCommentId}`);
            const newComment = response.data;
            setComments(prevComments => {
                const updatedComments = [...prevComments, newComment];
                console.log('Updated comments:', updatedComments);
                return updatedComments;
            });
        } catch (error) {
            console.error('There was an error fetching the new comment!', error);
        }
    };

    return (
        <div className="comments-container">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                        <span className="comment-author">{comment.nickname}</span>
                        <span className="comment-date">{comment.createdDate}</span>
                    </div>
                    <div className="comment-body">
                        <p>{showOriginalComments[comment.id] ? translatedComments[comment.id] : comment.comment}</p>
                    </div>
                    <div className="d-flex">
                        <button
                            onClick={() => handleTranslate(comment.id, comment.comment)}
                            className="btn btn-secondary btn-sm"
                        >
                            {showOriginalComments[comment.id] ? t('original') : t('translate')}
                        </button>
                        {user && user.nickname === comment.nickname && (
                            <div className="comment-actions">
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="btn btn-danger btn-sm ml-auto"
                                >
                                    {t('delete')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <CommentForm postId={postId} onCommentSubmit={addComment} />
        </div>
    );
};

export default Comments;
