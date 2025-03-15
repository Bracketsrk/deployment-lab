import { Link } from "react-router";
import "./ImageGallery.css";

export function ImageGallery(props) {
    
    return (
        <div>
            <h2>Image Gallery</h2>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {props.imageElements}
            </div>
        </div>
    );
}
