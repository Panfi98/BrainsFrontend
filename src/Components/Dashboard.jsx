import React from "react";
import {useAuth} from "../Context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {isLoggedIn, userData, setIsLoggedIn, setToken} = useAuth();
    const navigate = useNavigate();



    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {userData.username}</span>
                    <button>Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Analytics</a></li>
                            <li><a href="#">Reports</a></li>
                            <li><a href="#">Settings</a></li>
                        </ul>
                    </nav>
                </aside>
        </div>
            <footer className="dashboard-footer">
                <p>© 2025 Worker App. All rights reserved</p>
            </footer>
        </div>
    );
};

export default Dashboard;