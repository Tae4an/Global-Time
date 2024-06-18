import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const UserModify = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useUser();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [nationality, setNationality] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [nationalities, setNationalities] = useState([]);

    const nationalityToLanguage = {
        UnitedStates: 'en',
        Korea: 'ko',
        Japan: 'ja'
        // 다른 국가와 언어 매핑 추가
    };

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
            setNationality(user.user.nationality);
            const userLanguage = nationalityToLanguage[user.user.nationality] || 'ko';
            i18n.changeLanguage(userLanguage);
        }

        const fetchNationalities = async () => {
            try {
                const response = await axios.get('/api/nationalities'); // 국적 데이터를 가져오는 API 엔드포인트
                setNationalities(response.data);
            } catch (error) {
                console.error('국적 데이터를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchNationalities();
    }, [user, i18n]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert(t('passwordMismatch'));
            return;
        }
        if (nickname !== user.nickname && (!isNicknameChecked || !isNicknameValid)) {
            alert(t('duplicateCheckRequired'));
            return;
        }
        try {
            await axios.post('/api/auth/modify', {
                id: user.id,
                username: user.username,
                password,
                nickname,
                nationality
            });
            alert(t('updateSuccess'));
        } catch (error) {
            console.error(t('updateError'), error);
            alert(t('updateError'));
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setIsNicknameChecked(false);
        setIsNicknameValid(false);
    };

    const checkNickname = async () => {
        try {
            const response = await axios.get(`/api/auth/checkNickname?nickname=${nickname}`);
            if (response.data.available) {
                alert(t('availableNickname'));
                setIsNicknameValid(true);
            } else {
                alert(t('unavailableNickname'));
                setIsNicknameValid(false);
            }
            setIsNicknameChecked(true);
        } catch (error) {
            console.error(t('duplicateCheckError'), error);
            setIsNicknameValid(false);
            setIsNicknameChecked(true);
        }
    };

    if (!user) {
        return (
            <div>
                {t('loginRequired')}
                <button onClick={logout} className="btn btn-primary">{t('loginPage')}</button>
            </div>
        );
    }

    return (
        <div id="posts_list">
            <div className="container col-md-4">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" id="id" value={user.id} />
                    <input type="hidden" id="modifiedDate" value={user.modifiedDate} />
                    <div className="form-group">
                        <label htmlFor="realname">{t('realName')}</label>
                        <input type="text" id="realname" value={user.realName} className="form-control" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">{t('username')}</label>
                        <input type="text" id="username" value={user.username} className="form-control" readOnly />
                    </div>

                    {isChangingPassword && (
                        <>
                            <div className="form-group">
                                <label htmlFor="password">{t('password')}</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="form-control"
                                        placeholder={t('enterNewPassword')}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onMouseDown={() => setShowPassword(true)}
                                            onMouseUp={() => setShowPassword(false)}
                                            onMouseLeave={() => setShowPassword(false)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        className="form-control"
                                        placeholder={t('reenterPassword')}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onMouseDown={() => setShowConfirmPassword(true)}
                                            onMouseUp={() => setShowConfirmPassword(false)}
                                            onMouseLeave={() => setShowConfirmPassword(false)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {!isChangingPassword && (
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsChangingPassword(true)}
                            >
                                {t('changePassword')}
                            </button>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="nickname">{t('nickname')}</label>
                        <div className="input-group">
                            <input
                                type="text"
                                id="nickname"
                                className="form-control"
                                placeholder={t('enterNewNickname')}
                                value={nickname}
                                onChange={handleNicknameChange}
                            />
                            {nickname !== user.nickname && (
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={checkNickname}
                                    >
                                        {t('checkDuplicate')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">{t('email')}</label>
                        <input type="email" id="email" value={user.user.email} className="form-control" readOnly />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nationality">{t('nationality')}</label>
                        <select
                            id="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="form-control"
                        >
                            <option value={user.user.nationality}>{user.user.nationality}</option>
                            {Array.isArray(nationalities) && nationalities.map((nat, index) => (
                                <option key={index} value={nat.name}>
                                    {nat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="university">{t('university')}</label>
                        <input type="text" id="university" value={user.user.university} className="form-control" readOnly />
                    </div>

                    <button type="submit" id="btn-user-modify" className="btn btn-primary bi bi-check-lg">{t('complete')}</button>
                    <a href="/posts" role="button" className="btn btn-info bi bi-arrow-return-left">{t('backToList')}</a>
                </form>
            </div>
        </div>
    );
};

export default UserModify;
