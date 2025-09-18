export async function GetReferencesById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/references/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetReference failed ${response.status}`, {resumeId});
    }
    
    const reference = await response.json();
    const data = reference.data;

    return data;
}