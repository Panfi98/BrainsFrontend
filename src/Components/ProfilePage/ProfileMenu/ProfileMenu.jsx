import './ProfileMenu.css';
import { HiOutlineUser } from "react-icons/hi2";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function ProfileMenu() {

    return (
        <div className="profile-menu">
            <div className="profile-header">
                {/*<img src="" alt="User avatar" />*/}
                <p>My nickname</p>
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
            <button className="profile-menu-btn">
                <MdLogout className="icon" />
                <p>Log Out</p>
            </button>
        </div>
    );
}