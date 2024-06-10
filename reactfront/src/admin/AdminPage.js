import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]); // 초기 값을 빈 배열로 설정

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                if (Array.isArray(response.data)) { // 배열인지 확인
                    setUsers(response.data);
                } else {
                    setUsers([]); // 배열이 아닌 경우 빈 배열로 설정
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (userId) => {
        try {
            await axios.post(`/api/admin/approve/${userId}`);
            alert('승인되었습니다.');
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error approving user:', error);
            alert('승인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h1>관리자 페이지</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>이름: {user.realName}</p>
                        <p>대학교: {user.university}</p>
                        <p>학생증:</p>
                        <img src={user.studentCardUrl} alt="학생증" style={{ width: '200px' }} />
                        <button onClick={() => handleApprove(user.id)}>승인</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
