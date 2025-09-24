export async function AddCertification(certificationData, token, resumeId) {
    const {name, description, date, url, type, validTo, status} = certificationData;

    const fetchUrl = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/certification`;
    const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificationData)
    });

    if (!response.ok) {
        console.error(`AddCertification failed ${response.status}`, certificationData);
        const err = new Error(
            `AddCertification failed (${response.status}): ${JSON.stringify(certificationData)}`
        );
        err.status = response.status;
        err.payload = certificationData;
        throw err;
    }

    return response;
}