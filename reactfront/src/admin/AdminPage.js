import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data); // 응답 데이터를 콘솔에 출력하여 확인
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    setUsers([]);
                    console.error('Invalid data format:', response.data);
                    setError('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (userId) => {
        try {
            await axios.post(`/api/admin/approve/${userId}`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('승인되었습니다.');
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error approving user:', error);
            alert('승인 중 오류가 발생했습니다.');
        }
    };

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">관리자 페이지</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/posts')}>
                    이전
                </button>
            </div>
            <div className="row">
                {users.map(user => (
                    <div key={user.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">이름: {user.realName}</h5>
                                <p className="card-text">대학교: {user.university}</p>
                                <div className="mb-3">
                                    <p>학생증:</p>
                                    {user.studentCard && (
                                        <img
                                            src={`data:image/jpeg;base64,${user.studentCard}`}
                                            alt="학생증"
                                            className="img-fluid"
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={() => handleApprove(user.id)}
                                    className="btn btn-primary w-100"
                                >
                                    승인
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
