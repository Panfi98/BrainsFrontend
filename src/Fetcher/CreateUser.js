

export async function CreateUser(userData){
    const {username, password, password2, email,} = userData
    if (password !== password2) {
        return alert('Passwords do not match')
    }
    const response = await fetch(import.meta.env.VITE_BRAIN_SIGNUP_ENDPOINT, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            password: password,
            email: email,
        })
    });
    if (!response.ok) {
        return alert('Failed to create user');
    }
    return response;
}