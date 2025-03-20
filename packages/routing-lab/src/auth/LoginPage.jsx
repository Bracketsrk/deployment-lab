import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../requests/sendPostRequest";
import { Link, useNavigate} from "react-router";

async function handleSubmit(username, password, handleAuthToken, navigate) {
    // const username = formData.get("username");
    // const password = formData.get("password");

    // console.log("Username:", username);
    // console.log("Password:", password);

    const response = await sendPostRequest("/auth/login", {username: username, password: password});
    const body = await response.text();
    // console.log(response);
    // console.log(body);

    if (response.status === 400 || response.status === 401 || response.status === 500) {
        // console.log(body);
        return body;
    }
    else if (response.status === 200) {
        // JWT is the body
        handleAuthToken(body);
        navigate("/");
    }


};

export function LoginPage(props) {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h2>Login</h2>
                <UsernamePasswordForm onSubmit={(username, password) => handleSubmit(username, password, props.handleAuthToken, navigate)} formType="Login"/>
            </div>
            <div>
                <p>Don't have an account? <Link to={"/register"}>Register here</Link></p>
            </div>
        </div>
    )
}