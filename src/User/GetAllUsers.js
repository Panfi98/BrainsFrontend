export const GetAllUsers = async (authToken) => {
    if (!authToken) {
        console.log('No auth token available.')
        return [];
    }

    try {
        console.log('Fetching users with token:', authToken);

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
        console.log('Full API Response:', data);

        return data.data || data;
    } catch (error) {
        console.error('Error', error);
        return [];
    }
};