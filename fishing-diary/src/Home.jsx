import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const userEmail = localStorage.getItem('userEmail') || 'Fisherman';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary text-white">
            <div className="bg-light text-dark p-5 rounded shadow text-center w-50">
                <h1 className="mb-3">Welcome Back!</h1>
                <p className="lead">Glad to see you on your fishing dashboard</p>
                <button
                    className="btn btn-danger mt-4"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Home;
