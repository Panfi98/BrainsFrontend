export async function AddEducation(educationData, token) {
    const { name, description, startDate, endDate, degree, type, place, active, status } = educationData;

    const response = await fetch(import.meta.env.VITE_BRAIN_ADD_EDUCATION_ENDPOINT, {
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