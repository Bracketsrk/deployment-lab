import { useState } from "react";

export function ImageEditForm() {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        // Add your fetch code here...
        // const myRequest = new Request("https://example.org/post", {
        //     method: "POST",
        //     body: JSON.stringify({ username: "example" }),
        //     headers: myHeaders,
        //   });

        const data = {name: imageName}
          
        const response = await fetch(`/api/images/${imageId}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Bad request');
        }

        setImageId("");
        setImageName("");
        setIsLoading(false);
    }

    return (
        <div>
            <label style={{ display: "block" }}>
                Image ID
                <input
                        value={imageId}
                        disabled={isLoading}
                        onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New image name
                <input
                        value={imageName}
                        disabled={isLoading}
                        onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button disabled={isLoading} onClick={handleSubmit}>Send request</button>
        </div>
    );
}