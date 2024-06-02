import React, { useState } from 'react';
import axios from 'axios';

const UniversitySearch = ({ onSelectUniversity }) => {
    const [query, setQuery] = useState('');
    const [universities, setUniversities] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`/api/universities/search`, { params: { query: query } })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setUniversities(response.data);
                } else {
                    console.error('Response data is not an array', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching universities:', error);
            });
    };

    const handleSelect = (name) => {
        if (window.opener && window.opener.handleSelectUniversity) {
            window.opener.handleSelectUniversity(name);
        } else {
            console.error('handleUniversitySelect function is not defined in the opener window');
        }
        window.close();
    };

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="대학교 이름 검색"
                />
                <button type="submit">검색</button>
            </form>

            <ul>
                {universities.map((university, index) => (
                    <li key={index}>
                        <a href="#" onClick={() => handleSelect(university.name)}>
                            {university.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UniversitySearch;
