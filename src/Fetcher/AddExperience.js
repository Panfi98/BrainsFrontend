export async function AddExperience(experiencenData, token) {
    const {name, description, startedAt, endedAt, type, organisation, position, active, status} = experiencenData;
    
    const response = await fetch(import.meta.env.VITE_BRAIN_ADD_EXPERIENCE_ENDPOINT, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(experiencenData)
    });

    if (!response.ok) {
        console.error(`AddExperience failed ${response.status}`, experiencenData);
        const err = new Error(
            `AddExperience failed (${response.status}): ${JSON.stringify(experiencenData)}`
        );
        err.status = response.status;
        err.payload = experiencenData;
        throw err;
    }

    return response;
}