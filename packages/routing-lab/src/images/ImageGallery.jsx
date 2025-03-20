import { Link } from "react-router";
import "./ImageGallery.css";
import { ProtectedRoute } from "../auth/ProtectedRoute";

export function ImageGallery(props) {
    
    return (
        <div>
            <ProtectedRoute authToken={props.authToken}>
                <h2>Image Gallery</h2>
                {props.isLoading && "Loading..."}
                <div className="ImageGallery">
                    {props.imageElements}
                </div>
            </ProtectedRoute>
        </div>
    );
}
