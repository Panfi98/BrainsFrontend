export async function UpdateSkill ({skillId, skillsData, token}) {
    if (!skillId) {
            throw new Error("UpdateSkill called without valid id");
    }
    console.log("PUT payload:", skillId, skillsData);

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/skill/${skillId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillsData)
    });

     if (!response.ok) {
        console.error(`UpdateSkill failed ${response.status}`, skillsData);
    }

    return response;
}