export async function AddEducation(educationData, token, resumeId) {
    const { name, description, startDate, endDate, degree, type, place, active, status } = educationData;

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}/education`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(educationData)
    });

    if (!response.ok) {
        console.error(`AddEducation failed ${response.status}`, educationData);
        const err = new Error(
            `AddEducation failed (${response.status}): ${JSON.stringify(educationData)}`
        );
        err.status = response.status;
        err.payload = educationData;
        throw err;
    }

    return response;
}