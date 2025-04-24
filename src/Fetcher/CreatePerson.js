export async function CreatePerson(personData, token) {
    const { firstName, lastName, birthday, email, phoneNumber, address, pictureURL, summary, status } = personData;

    const response = await fetch(import.meta.env.VITE_BRAIN_CREATE_PERSON_ENDPOINT, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
    });

    if (!response.ok) {
        console.error(`CreatePerson failed ${response.status}`, personData);
        const err = new Error(
            `CreatePerson failed (${response.status}): ${JSON.stringify(personData)}`
        );
        err.status = response.status;
        err.payload = personData;
        throw err;
    }

    return response;
}