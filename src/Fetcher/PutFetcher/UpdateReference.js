export async function UpdateReference ({referenceId, referenceData, token}) {
    if (!referenceId) {
            throw new Error("UpdateReference called without valid id");
    }

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/reference/${referenceId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(referenceData)
    });

     if (!response.ok) {
        console.error(`UpdateReference failed ${response.status}`, referenceData);
    }

    return response;
}