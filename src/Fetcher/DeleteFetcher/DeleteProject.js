export async function DeleteProject(projectId, token) {
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/project/${projectId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw new Error(`DeleteProject ${projectId} feiled`)
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