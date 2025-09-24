export async function UpdateExperience ({experienceId, experienceData, token}) {
    if (!experienceId) {
            throw new Error("UpdateExperience called without valid id");
    }

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/experience/${experienceId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(experienceData)
    });

     if (!response.ok) {
        console.error(`UpdateExperience failed ${response.status}`, experienceData);
    }

    return response;
}