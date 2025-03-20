import { Link } from "react-router";
import "./ImageGallery.css";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { useImageFetching } from "./useImageFetching";

export function ImageGallery(props) {
    // console.log("Image gal")
    // console.log(props.authToken);
    const { data, error, isLoading } = useImageFetching(props.authToken);

    // if (props.authToken) {

    if (isLoading) {
        return <ProtectedRoute authToken={props.authToken}><div>Loading...</div>;</ProtectedRoute>
    }

    if (error) {
        return <ProtectedRoute authToken={props.authToken}><div>Error.</div></ProtectedRoute>
    }
    // if (!Array.isArray(data)) {
    //     return <div>Error: Data is not an array</div>;
    // }


    const imageElements = data.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));
    // console.log(imageElements);
    // }
    
    return (
        <div>
            <ProtectedRoute authToken={props.authToken}>
                <h2>Image Gallery</h2>
                {isLoading && "Loading..."}
                <div className="ImageGallery">
                    {imageElements}
                </div>
            </ProtectedRoute>
        </div>
    );
}
