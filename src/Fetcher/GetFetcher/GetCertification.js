export async function GetCertificationsById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/certifications/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetCertification failed ${response.status}`, {resumeId});
    }
    
    const certification = await response.json();
    const data = certification.data;

    return data;
}