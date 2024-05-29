import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ hasPrev, hasNext, previous, next }) => {
    return (
        <div className="pagination justify-content-center">
            {hasPrev ? (
                <Link to={`?page=${previous}`} role="button" className="btn btn-lg bi bi-caret-left-square-fill"></Link>
            ) : (
                <button className="btn btn-lg bi bi-caret-left-square-fill disabled" disabled></button>
            )}

            {hasNext ? (
                <Link to={`?page=${next}`} role="button" className="btn btn-lg bi bi-caret-right-square-fill"></Link>
            ) : (
                <button className="btn btn-lg bi bi-caret-right-square-fill disabled" disabled></button>
            )}
        </div>
    );
};

export default Pagination;
