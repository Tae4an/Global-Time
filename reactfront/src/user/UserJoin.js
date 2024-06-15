import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/UserJoin.css';

const UserJoin = () => {
    const [username, setUsername] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [realName, setRealName] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [nickname, setNickname] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [email, setEmail] = useState('');
    const [university, setUniversity] = useState('');
    const [universities, setUniversities] = useState([]);
    const [universitySelected, setUniversitySelected] = useState(false);
    const [nationality, setNationality] = useState('');
    const [nationalities, setNationalities] = useState([]);
    const [studentCard, setStudentCard] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNationalities = async () => {
            try {
                const response = await axios.get('/api/nationalities');
                setNationalities(response.data);
            } catch (error) {
                console.error('Error fetching nationalities:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get('/api/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchNationalities();
        fetchDepartments();
    }, []);

    const handleSearchUniversities = async (e) => {
        const query = e.target.value;
        setUniversity(query);
        setUniversitySelected(false);
        if (query.length > 1) {
            try {
                const response = await axios.get('/api/universities/search', { params: { query } });
                setUniversities(response.data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        } else {
            setUniversities([]);
        }
    };

    const handleSelectUniversity = (name) => {
        setUniversity(name);
        setUniversitySelected(true);
        setUniversities([]);
    };

    const validateFields = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!universitySelected) newErrors.university = '대학교를 선택해주세요.';
            if (!department) newErrors.department = '학과를 선택해주세요.';
        } else if (currentStep === 2) {
            if (!username) newErrors.username = '아이디를 입력해주세요.';
            if (!password) newErrors.password = '비밀번호를 입력해주세요.';
            if (!confirmPassword) newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
            if (password !== confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
            if (!nickname) newErrors.nickname = '닉네임을 입력해주세요.';
            if (!realName) newErrors.realName = '실명을 입력해주세요.';
            if (!email) newErrors.email = '이메일을 입력해주세요.';
            if (!validateEmail(email)) newErrors.email = '올바른 이메일 형식을 입력해주세요.';
            if (!studentCard) newErrors.studentCard = '학생증을 업로드해주세요.';
            if (!nationality) newErrors.nationality = '국적을 선택해주세요.';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            alert(Object.values(newErrors).join('\n'));
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (!validateFields()) return;
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateFields()) return;

        const formData = new FormData();
        const user = {
            username,
            password,
            realName,
            department,
            nickname,
            email,
            university,
            nationality
        };
        formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
        formData.append('studentCard', studentCard);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/joinProc', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                alert('회원가입이 완료되었습니다.');
                navigate('/auth/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                const newErrors = {};
                errorData.errors.forEach((err) => {
                    if (err.field === 'email') {
                        newErrors.email = err.defaultMessage;
                    } else if (err.field === 'password') {
                        newErrors.password = err.defaultMessage;
                    }
                    // 필요한 다른 필드에 대한 오류 메시지 추가
                });
                setErrors(newErrors);
                alert(Object.values(newErrors).join('\n'));
            } else {
                console.error('There was an error!', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    const handleFileChange = (e) => {
        setStudentCard(e.target.files[0]);
    };

    const checkUsernameAvailability = async () => {
        if (!username) {
            alert('아이디를 입력해주세요.');
            setErrors((prevErrors) => ({ ...prevErrors, username: '아이디를 입력해주세요.' }));
            return;
        }

        try {
            const response = await axios.get('/api/auth/checkUsername', { params: { username } });
            setIsUsernameAvailable(response.data.available);
            if (response.data.available) {
                alert('사용 가능한 아이디입니다.');
            } else {
                alert('이미 사용 중인 아이디입니다.');
            }
        } catch (error) {
            console.error('Error checking username availability:', error);
        }
    };

    const checkNicknameAvailability = async () => {
        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            setErrors((prevErrors) => ({ ...prevErrors, nickname: '닉네임을 입력해주세요.' }));
            return;
        }

        try {
            const response = await axios.get('/api/auth/checkNickname', { params: { nickname } });
            setIsNicknameAvailable(response.data.available);
            if (response.data.available) {
                alert('사용 가능한 닉네임입니다.');
            } else {
                alert('이미 사용 중인 닉네임입니다.');
            }
        } catch (error) {
            console.error('Error checking nickname availability:', error);
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleInputChange = (e, setter, field) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            });
        }

        if (field === 'username') {
            setIsUsernameAvailable(null);
        } else if (field === 'nickname') {
            setIsNicknameAvailable(null);
        }
    };

    const togglePasswordVisibility = (setter) => {
        setter(prevState => !prevState);
    };

    return (
        <div id="posts_list">
            <div className="container col-md-4">
                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <>
                            <div className="form-group">
                                <label>대학교</label>
                                <input
                                    type="text"
                                    name="university"
                                    id="university"
                                    value={university}
                                    onChange={(e) => handleInputChange(e, setUniversity, 'university')}
                                    onInput={handleSearchUniversities}
                                    className={`form-control ${errors.university && 'is-invalid'}`}
                                    placeholder="대학교를 검색해주세요"
                                />
                                {errors.university && <div className="invalid-feedback">{errors.university}</div>}
                                {universities.length > 0 && (
                                    <ul className="search-results">
                                        {universities.map((uni, index) => (
                                            <li key={index} onClick={() => handleSelectUniversity(uni.name)}>
                                                {uni.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group">
                                <label>학과</label>
                                <select
                                    name="department"
                                    value={department}
                                    onChange={(e) => handleInputChange(e, setDepartment, 'department')}
                                    className="form-control"
                                >
                                    <option value="">학과를 선택해주세요</option>
                                    {departments.map((dep, index) => (
                                        <option key={index} value={dep.name}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleNextStep}>다음</button>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="form-group">
                                <label>아이디</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => handleInputChange(e, setUsername, 'username')}
                                        className={`form-control ${errors.username && 'is-invalid'} ${isUsernameAvailable === true ? 'is-valid' : isUsernameAvailable === false ? 'is-invalid' : ''}`}
                                        placeholder="아이디를 입력해주세요"
                                    />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-outline-secondary" onClick={checkUsernameAvailability}>중복확인</button>
                                    </div>
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>비밀번호</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={(e) => handleInputChange(e, setPassword, 'password')}
                                        className={`form-control ${errors.password && 'is-invalid'}`}
                                        placeholder="비밀번호를 입력해주세요"
                                    />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-outline-secondary"
                                                onMouseDown={() => togglePasswordVisibility(setShowPassword)}
                                                onMouseUp={() => togglePasswordVisibility(setShowPassword)}>
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </div>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>비밀번호 확인</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => handleInputChange(e, setConfirmPassword, 'confirmPassword')}
                                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                        placeholder="비밀번호를 다시 입력해주세요"
                                    />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-outline-secondary"
                                                onMouseDown={() => togglePasswordVisibility(setShowConfirmPassword)}
                                                onMouseUp={() => togglePasswordVisibility(setShowConfirmPassword)}>
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>닉네임</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="nickname"
                                        value={nickname}
                                        onChange={(e) => handleInputChange(e, setNickname, 'nickname')}
                                        className={`form-control ${errors.nickname && 'is-invalid'} ${isNicknameAvailable === true ? 'is-valid' : isNicknameAvailable === false ? 'is-invalid' : ''}`}
                                        placeholder="닉네임을 입력해주세요"
                                    />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-outline-secondary" onClick={checkNicknameAvailability}>중복확인</button>
                                    </div>
                                    {errors.nickname && <div className="invalid-feedback">{errors.nickname}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>실명</label>
                                <input
                                    type="text"
                                    name="realName"
                                    value={realName}
                                    onChange={(e) => handleInputChange(e, setRealName, 'realName')}
                                    className={`form-control ${errors.realName && 'is-invalid'}`}
                                    placeholder="실명을 입력해주세요"
                                />
                                {errors.realName && <div className="invalid-feedback">{errors.realName}</div>}
                            </div>
                            <div className="form-group">
                                <label>이메일</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => handleInputChange(e, setEmail, 'email')}
                                        className={`form-control ${errors.email && 'is-invalid'}`}
                                        placeholder="이메일을 입력해주세요"
                                    />
                                </div>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label>국적</label>
                                <select
                                    name="nationality"
                                    value={nationality}
                                    onChange={(e) => handleInputChange(e, setNationality, 'nationality')}
                                    className="form-control"
                                >
                                    <option value="">국적을 선택해주세요</option>
                                    {nationalities.map((nat, index) => (
                                        <option key={index} value={nat.name}>
                                            {nat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                            </div>
                            <div className="form-group">
                                <label>학생증 업로드</label>
                                <input
                                    type="file"
                                    name="studentCard"
                                    onChange={handleFileChange}
                                    className={`form-control ${errors.studentCard && 'is-invalid'}`}
                                />
                                {errors.studentCard && <div className="invalid-feedback">{errors.studentCard}</div>}
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={handlePreviousStep}>이전</button>
                            <button type="submit" className="btn btn-primary bi bi-person">가입</button>
                        </>
                    )}
                </form>
                <a href="/" role="button" className="btn btn-info bi bi-arrow-return-left">목록</a>
            </div>
        </div>
    );
};

export default UserJoin;
