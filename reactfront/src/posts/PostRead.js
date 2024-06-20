import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../comment/Comments';
import '../css/PostRead.css'
import { useTranslation } from 'react-i18next';

const PostRead = ({ user }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [translatedTitle, setTranslatedTitle] = useState('');
    const [translatedContent, setTranslatedContent] = useState('');
    const [showOriginalTitle, setShowOriginalTitle] = useState(true);
    const [showOriginalContent, setShowOriginalContent] = useState(true);
    const navigate = useNavigate();

    // 번역을 위한 국가별 언어 코드 매핑
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
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                setError(error);
                console.error("There was an error fetching the post!", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleTranslateTitle = async (e) => {
        e.preventDefault();  // 버튼 새로고침 기본 동작 막기
        if (showOriginalTitle) {
            const targetLanguage = nationalityToLanguage[user.user.nationality] || 'ko';  // 사용자의 국적에 따라 언어 설정
            console.log(`Translating title to: ${targetLanguage}`);

            try {
                const response = await axios.post('http://127.0.0.1:5000/translate', {
                    text: post.title,
                    target_language: targetLanguage
                });
                console.log(`Translated title: ${response.data.translated_text}`);
                setTranslatedTitle(response.data.translated_text);
                setShowOriginalTitle(false);
            } catch (error) {
                console.error('Translation error:', error);
            }
        } else {
            setShowOriginalTitle(true);
        }
    };

    const handleTranslateContent = async (e) => {
        e.preventDefault();  // 버튼 새로고침 기본 동작 막기
        if (showOriginalContent) {
            const targetLanguage = nationalityToLanguage[user.user.nationality] || 'ko';  // 사용자의 국적에 따라 언어 설정
            console.log(`Translating content to: ${targetLanguage}`);

            try {
                const response = await axios.post('http://127.0.0.1:5000/translate', {
                    text: post.content,
                    target_language: targetLanguage
                });
                console.log(`Translated content: ${response.data.translated_text}`);
                setTranslatedContent(response.data.translated_text);
                setShowOriginalContent(false);
            } catch (error) {
                console.error('Translation error:', error);
            }
        } else {
            setShowOriginalContent(true);
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(t('confirmDelete'));
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/posts/${id}`)
                .then(() => {
                    alert(t('deleteSuccess'));
                    navigate('/posts');
                })
                .catch(error => {
                    console.error('There was an error deleting the post!', error);
                });
        }
    };

    if (error) {
        return <div>{t('errorFetchingPost')}: {error.message}</div>;
    }

    if (!post) {
        return <div>{t('loading')}</div>;
    }

    const isWriter = user && user.nickname === post.writer;

    return (
        <>
            <br />
            <div id="posts_list" className="d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <form className="card">
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="id">{t('number')} : {post.id}</label>
                            <input type="hidden" id="id" value={post.id} />
                            <label htmlFor="createdDate">{post.createdDate}</label>
                        </div>
                        <div className="card-header d-flex justify-content-between">
                            <label htmlFor="writer">{t('writer')} : {post.writer}</label>
                            <label htmlFor="view"><i className="bi bi-eye-fill"> {post.view}</i></label>
                        </div>
                        <div className="card-body">
                            <label htmlFor="title">{t('title')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={showOriginalTitle ? post.title : translatedTitle}
                                readOnly
                            />
                            <button onClick={handleTranslateTitle} className="btn btn-secondary mt-1">
                                {showOriginalTitle ? t('translate') : t('original')}
                            </button>
                            <br />
                            <label htmlFor="content">{t('content')}</label>
                            <textarea
                                rows="5"
                                className="form-control"
                                id="content"
                                value={showOriginalContent ? post.content : translatedContent}
                                readOnly
                            ></textarea>
                            <button onClick={handleTranslateContent} className="btn btn-secondary mt-1">
                                {showOriginalContent ? t('translate') : t('original')}
                            </button>
                        </div>
                    </form>

                    <div className="d-flex justify-content-between mt-2">
                        <Link to="/posts" role="button" className="btn btn-info bi bi-arrow-return-left"> {t('list')}</Link>
                        <div>
                            {isWriter && (
                                <>
                                    <Link to={`/posts/update/${post.id}`} role="button" className="btn btn-primary bi bi-pencil-square mx-1"> {t('edit')}</Link>
                                    <button type="button" onClick={handleDelete} className="btn btn-danger bi bi-trash mx-1"> {t('delete')}</button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Comments */}
                    <Comments postId={post.id} userId={user.user.id} />
                </div>
            </div>
        </>
    );
};

export default PostRead;
