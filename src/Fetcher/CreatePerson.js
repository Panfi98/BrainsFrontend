export async function CreatePerson(personData, token) {
    const { firstName, lastName, birthday, email, phoneNumber, address, pictureURL, summary } = personData;
    
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
        return alert('Failed to create person');
    }
    return response;
}