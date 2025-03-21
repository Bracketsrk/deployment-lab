export async function sendPostRequest(url: string, payload: any) {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(payload)
        })

        return response;

    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }

}