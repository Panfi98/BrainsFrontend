export async function UpdateProject ({projectId, projectData, token}) {
    if (!projectId) {
            throw new Error("UpdateProject called without valid id");
    }

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/project/${projectId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    });

     if (!response.ok) {
        console.error(`UpdateProject failed ${response.status}`, projectData);
    }

    return response;
}