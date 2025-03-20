import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../requests/sendPostRequest";
import { useNavigate } from "react-router";

async function handleSubmit(username, password, handleAuthToken, navigate) {
    // const username = formData.get("username");
    // const password = formData.get("password");

    console.log("Username:", username);
    console.log("Password:", password);
    const response = await sendPostRequest("/auth/register", {username: username, password: password});
    const body = await response.text();

    if (response.status === 400 || response.status === 401 || response.status === 500) {
        console.log(body);
        return body;
    }
    else if (response.status === 201) {
        // JWT is the body
        handleAuthToken(body);
        navigate("/");
    }

}

export function RegisterPage(props) {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Register a New Account</h2>
            <UsernamePasswordForm onSubmit={(username, password) => handleSubmit(username, password, props.handleAuthToken, navigate)} formType="Register" />
        </div>
        
    )
}