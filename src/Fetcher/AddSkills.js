export async function AddSkills(skillsData, token, resumeId) {
    const {name, description, type, level, status} = skillsData;
    
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/skill`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillsData)
    });

    if (!response.ok) {
        console.error(`AddSkills failed ${response.status}`, skillsData);
        const err = new Error(
            `AddSkills failed (${response.status}): ${JSON.stringify(skillsData)}`
        );
        err.status = response.status;
        err.payload = skillsData;
        throw err;
    }

    return response;
}