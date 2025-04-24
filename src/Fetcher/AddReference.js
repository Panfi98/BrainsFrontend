export async function AddReference(referenceData, token) {
    const { firstName, lastName, email, phoneNumber, position, status } = referenceData;
    
    const response = await fetch(import.meta.env.VITE_BRAIN_ADD_REFERENCE_ENDPOINT, {
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