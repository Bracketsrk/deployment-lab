export async function sendPostRequest(url, payload) {
    // const data = {name: imageName}
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(payload)
        })

        // console.log(await response.text());
        return response;

    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }

}