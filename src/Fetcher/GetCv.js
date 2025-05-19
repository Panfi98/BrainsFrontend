export async function GetCvById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`            
        }
    });

    if(!response.ok){
        console.error(`GetResume failed ${response.status}`, {resumeId});
    }

    const resume = await response.json();
    const data = resume.data

    return data;
}
