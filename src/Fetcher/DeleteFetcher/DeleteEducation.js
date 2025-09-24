export async function DeleteEducation(educationId, token) {
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/education/${educationId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw new Error(`DeleteEducation ${educationId} feiled`)
    }

    if (response.status === 204) {
        return true;
    }

    try {
        return await response.json();
    } catch {
        return true;
    }
}