export async function AddExperience(experiencenData, token, resumeId) {
    const {name, description, startedAt, endedAt, type, organisation, position, active, status} = experiencenData;
    
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/experience`;
    const response = await fetch(url, {
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

    console.log("Response: ", response)

    return response;
}