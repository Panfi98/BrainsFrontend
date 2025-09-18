export async function GetExperiencesById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/experiences/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetExperience failed ${response.status}`, {resumeId});
    }
    
    const experience = await response.json();
    const data = experience.data;

    return data;
}