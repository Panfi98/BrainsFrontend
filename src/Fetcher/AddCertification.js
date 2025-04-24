export async function AddCertification(certificationData, token) {
    const {name, description, date, url, type, validTo, status} = certificationData;

    const response = await fetch(import.meta.env.VITE_BRAIN_ADD_CERTIFICATION_ENDPOINT, {
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