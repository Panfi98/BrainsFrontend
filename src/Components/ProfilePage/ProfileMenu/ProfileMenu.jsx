import './ProfileMenu.css';
import { HiOutlineUser } from "react-icons/hi2";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../../Context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {

    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate('/login')
    }

    return (
        <div className="profile-menu">
            <div className="profile-header">
                <p>{userData.username}</p>
            </div>
            <button className="profile-menu-btn">
                <HiOutlineUser className="icon" />
                <p>My profile</p>
            </button>
            <button className="profile-menu-btn">
                <IoNotificationsOutline className="icon" />
                <p>Notifications</p>
            </button>
            <button className="profile-menu-btn">
                <IoSettingsOutline className="icon" />
                <p>Setting</p>
            </button>
            <button onClick={handleLogout} className="profile-menu-btn">
                <MdLogout className="icon" />
                <p>Log Out</p>
            </button>
        </div>
    );
}