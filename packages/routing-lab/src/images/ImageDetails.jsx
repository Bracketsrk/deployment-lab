import { useParams } from "react-router";
import { useImageFetching } from "./useImageFetching.js";

export function ImageDetails(props) {
    const { imgId } = useParams();
    // const { isLoading, fetchedImages } = useImageFetching(imgId, 500);
    const { data, error, isLoading } = useImageFetching();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
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
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </div>
    )
}
