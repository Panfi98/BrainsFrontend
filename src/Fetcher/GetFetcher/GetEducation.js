export async function GetEducationById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/educations/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetEducation failed ${response.status}`, {resumeId});
    }
    
    const education = await response.json();
    const data = education.data;

    return data;
}