import { useEffect } from "react";

export const GetAllUsers = ({ users, setUsers, authToken }) => {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://localhost:7106/user", {
                    method: "GET",
                    headers: {
                        "accept": "*/*",
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await res.json();
                const usersData = data.data;
                console.log('User data:', usersData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchUsers();
    }, [setUsers, authToken]);

    return (
        <ul className='users-list'>
            {users?.map((user, index) => (
                <li key={index}>
                    <h3>{user.Name}</h3>
                    <h2>{user.Password}</h2>
                </li>
            ))}
        </ul>
    );
};
