import { ImageEditForm } from "./images/ImageEditForm"
import { ProtectedRoute } from "./auth/ProtectedRoute";

export function Homepage(props) {
    return (
        <>
        <ProtectedRoute authToken={props.authToken}>
            <div>
                <h2>Welcome, {props.userName}</h2>
                <p>This is the content of the home page.</p>
            </div>
            
            <div>
                <ImageEditForm />
            </div>
        </ProtectedRoute>
        </>
    );
}
