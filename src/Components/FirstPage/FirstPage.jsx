import React from 'react';
import './FirstPage.css';
import '../../App.jsx';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
    const navigate = useNavigate();

    return (
    <div className="first-page">
        <div className="first-page-header">
            <h1>Home</h1>
            <div className="header-buttons">
                <button onClick={() => navigate('/signup')}>Sigh up</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
        <div className="first-page-content">
            <h1>Welcome to the First Page</h1>
            <p>This is the initial page of the application.</p>
        </div>
    </div>
  );
}

export default FirstPage;