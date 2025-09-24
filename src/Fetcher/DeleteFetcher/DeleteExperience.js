export async function DeleteExperience(experienceId, token) {
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/experience/${experienceId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw new Error(`DeleteExperience ${experienceId} feiled`)
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