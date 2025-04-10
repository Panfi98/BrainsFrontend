import { useState } from "react";
import { SubmitButton } from "../Components/Button/SubmitButton.jsx";
import {GetAllUsers} from "./GetAllUsers.js";

export const User = ({ authToken }) => {
    const [users, setUsers] = useState();

    const loadUsers = async () => {
        console.log('Loading users...');
        const fetchedUsers = await GetAllUsers(authToken);
        setUsers(fetchedUsers);

    };



    return (
        <div className={'User'}>
            <h1>Users</h1>
            <div className='GetAllUsers'>
                <SubmitButton onClick={loadUsers} />
                <ul className='users-list'>
                    {users?.map((user, index) => (
                        <li key={index}>
                            <p>Username: {user.name}</p>
                            <p>Password: {user.password}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='GetUserById'>
            </div>
        </div>
    );
};
