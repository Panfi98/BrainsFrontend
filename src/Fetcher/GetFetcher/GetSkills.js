export async function GetSkillsById(resumeId, token){

    const url = `${import.meta.env.VITE_BRAIN_RESUME_ENDPOINT}/skills/${resumeId}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accept': '*/*',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        console.error(`GetSkill failed ${response.status}`, {resumeId});
    }
    
    const skill = await response.json();
    const data = skill.data;

    return data;
}