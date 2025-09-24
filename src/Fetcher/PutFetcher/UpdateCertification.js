export async function UpdateCertification ({certificationId, certificationData, token}) {
    if (!certificationId) {
            throw new Error("UpdateCertification called without valid id");
    }

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/certification/${certificationId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificationData)
    });

     if (!response.ok) {
        console.error(`UpdateCertification failed ${response.status}`, certificationData);
    }

    return response;
}