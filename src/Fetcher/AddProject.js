export async function AddProject(projectData, token, resumeId) {
    const { name, description, startDate, endDate, completed, status } = projectData;
    
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/project`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        console.error(`AddProject failed ${response.status}`, projectData);
        const err = new Error(
            `AddProject failed (${response.status}): ${JSON.stringify(projectData)}`
        );
        err.status = response.status;
        err.payload = projectData;
        throw err;
    }

    return response;
}