export async function UpdateEducation ({educationId, educationData, token}) {
    if (!educationId) {
            throw new Error("UpdateEducation called without valid id");
    }

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/education/${educationId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(educationData)
    });

     if (!response.ok) {
        console.error(`UpdateEducation failed ${response.status}`, educationData);
    }

    return response;
}