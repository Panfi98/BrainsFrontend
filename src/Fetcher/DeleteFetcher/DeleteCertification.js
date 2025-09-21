export async function DeleteCertification(certificationId, token) {
    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/certification/${certificationId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw new Error(`DeleteCertification ${certificationId} feiled`)
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