export async function GetProjectsById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/projects/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetProject failed ${response.status}`, {resumeId});
    }
    
    const project = await response.json();
    const data = project.data;

    return data;
}