import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './CVmaker.css';

const CVmaker = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="cv-maker">
            <div className="last-stage"></div>
            <h1 className="cv-maker-header">CV Maker</h1>
            <div className="next-stage"></div>
            <div className="cv-form">
                <form>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="experience">Experience:</label>
                        <textarea id="experience" name="experience" required></textarea>
                    </div>

                    <button type="submit">Next stage</button>
                </form>
            </div>
            <div className="cv-tips">

            </div>
        </div>
    );
}

export default CVmaker;