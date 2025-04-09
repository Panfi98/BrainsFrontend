import { useEffect, useState } from "react";
import { GetAllUsers } from "./UserComponents/GetAllUsers.jsx";
import { SubmitButton } from "../Components/Button/SubmitButton.jsx";

export const User = ({ authToken }) => {
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        console.log('Loading users...');
        setUsers([]);
        <GetAllUsers users={users} setUsers={setUsers} />;
    };

    return (
        <div className={'User'}>
            <h1>Users</h1>
            <div className='GetAllUsers'>
                <GetAllUsers users={users} setUsers={setUsers} />
            </div>
            <div className='GetUserById'>
                
            </div>
        </div>
    );
};
