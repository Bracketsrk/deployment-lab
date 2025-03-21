import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../requests/sendPostRequest";
import { Link, useNavigate} from "react-router";
import { jsx } from "react/jsx-runtime";

interface LoginPageProps {
    handleAuthToken: (body: string) => void;
}

interface HandleSubmitProps {
    username: string;
    password: string;
    handleAuthToken: (body: string) => void;
    navigate: Function;
}


async function handleSubmit({username, password, handleAuthToken, navigate}: HandleSubmitProps): Promise<string> {
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
        return "";
    }
    return "";
};

export function LoginPage({handleAuthToken}: LoginPageProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center">
            <div>
                <h2 className="text-2xl font-bold text-center mb-[1rem]">Login</h2>
                <UsernamePasswordForm onSubmit={(username, password) => handleSubmit({ username, password, handleAuthToken, navigate })}  formType="Login"/>
            </div>
            <div className="flex flex-col items-center">
                <p className="mb-[.5rem] mt-[2rem]">Don't have an account?</p> 
                <p><span className="text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[.25rem] py-[0.25rem] ml-[1rem] cursor-pointer"><Link to={"/register"}>Register here</Link></span></p>
            </div>
        </div>
    )
}