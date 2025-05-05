export async function AddReference(referenceData, token, resumeId) {
    const { firstName, lastName, email, phoneNumber, position, status } = referenceData;
    
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/reference`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(referenceData)
    });

    if (!response.ok) {
        console.error(`AddReference failed ${response.status}`, referenceData);
        const err = new Error(
            `AddReference failed (${response.status}): ${JSON.stringify(referenceData)}`
        );
        err.status = response.status;
        err.payload = referenceData;
        throw err;
    }

    return response;
}