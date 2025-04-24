export async function AddSkills(skillsData, token) {
    const {name, description, type, level, status} = skillsData;
    
    const response = await fetch(import.meta.env.VITE_BRAIN_ADD_SKILLS_ENDPOINT, {
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