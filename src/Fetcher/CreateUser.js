export async function CreateUser(userData){
    const {username, password, email} = userData
    const response = await fetch(import.meta.env.VITE_BRAIN_SIGNUP_ENDPOINT, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        })
    });
    return response;
}