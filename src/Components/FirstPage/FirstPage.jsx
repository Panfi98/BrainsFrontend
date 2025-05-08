import React from 'react';
import './FirstPage.css';
import '../../App.jsx'; // Assuming this is for global styles or context, keeping it.
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
    const navigate = useNavigate();

    return (
        <div className="first-page-container">
            <header className="first-page-header">
                <div className="logo-title">
                    <h1>JobNest</h1>
                </div>
                <nav className="header-nav">
                    <button onClick={() => navigate('/login')} className="nav-button login-button">Login</button>
                    <button onClick={() => navigate('/signup')} className="nav-button signup-button">Sign Up</button>
                </nav>
            </header>
            <main className="first-page-content">
                <div className="hero-section">
                    <h2>Welcome to JobNest</h2>
                    <p>Apply fast, apply well.</p>
                </div>
            </main>
            <footer className="first-page-footer">
                <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default FirstPage;