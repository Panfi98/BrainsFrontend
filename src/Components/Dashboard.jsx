import React from "react";
import '../App.css'; // Assuming App.css contains dashboard styles or import specific dashboard styles
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {userData?.username || 'Not Logged In (close this route in the futere)'}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                 <p>This is your protected dashboard area.</p>
            </div>
            <footer className="dashboard-footer">
                <p>© 2025 Worker App. All rights reserved</p>
            </footer>
        </div>
    );
};

export default Dashboard;