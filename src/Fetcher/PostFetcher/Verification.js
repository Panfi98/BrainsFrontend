export async function Verification(userId, code) {

    const url = `${import.meta.env.VITE_BRAIN_VERIFY_EMAIL_ENDPOINT}/${userId}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error verifying code:", error);
        throw error;
    }
}
