import { useParams } from "react-router";
import { useImageFetching } from "./useImageFetching.js";
import { ProtectedRoute } from "../auth/ProtectedRoute";

export function ImageDetails(props) {
    const { imgId } = useParams();
    // const { isLoading, fetchedImages } = useImageFetching(imgId, 500);
    const { data, error, isLoading } = useImageFetching(props.authToken);

    if (isLoading) {
        return <ProtectedRoute authToken={props.authToken}><div>Loading...</div>;</ProtectedRoute>
    }
    if (error) {
        return <ProtectedRoute authToken={props.authToken}><div>Error: {error.message}</div>;</ProtectedRoute>
    }
    // console.log("BLKASJDLKAJ");
    // console.log(data);

    const imageData = data.find(image => image._id === imgId);
    // console.log(imageData);
    
    if (!imageData) {
        return <div><h2>Image not found</h2></div>;
    }

    return (
        <div>
            <ProtectedRoute authToken={props.authToken}>
                <h2>{imageData.name}</h2>
                <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
            </ProtectedRoute>
        </div>
    )
}
