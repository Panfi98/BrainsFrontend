import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import ProfileMenu from "./ProfileMenu/ProfileMenu.jsx";
import { PiNotePencil } from "react-icons/pi";

const Profile = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <ProfileMenu />
            <div className="profile-content">
                <div>
                    <div className="profile-person shadow">
                        <img src="" alt="photo" className="avatar"/>
                        <div className="person-info">
                            <div className="person-name">
                                <h2>First name</h2>
                                <h2>Last name</h2>
                            </div>
                            <p>Date of Birth:</p>
                            <p>Phone number:</p>
                            <p>Email:</p>
                            <p>Address:</p>
                        </div>
                        <button className="edit-button">
                            <PiNotePencil className="icon" />
                        </button>
                    </div>
                </div>
                <div className="profile-education shadow">
                    <div className="education-box">
                        <h2>Education</h2>
                        <div className="education-info">
                            <div className="education-item">
                                <p className="u-name">University:</p>
                                <p className="degree">Degree:</p>
                                <p className="date">Date:</p>
                            </div>
                            <div className="education-item">
                                <p className="u-name">University:</p>
                                <p className="degree">Degree:</p>
                                <p className="date">Date:</p>
                            </div>
                        </div>
                    </div>
                    <button className="edit-button">
                        <PiNotePencil className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;