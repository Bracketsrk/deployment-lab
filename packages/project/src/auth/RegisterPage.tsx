import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../requests/sendPostRequest";
import { useNavigate } from "react-router";


// interface HeaderProps {
//     isOpen: boolean;
//     ref: Ref<HTMLDivElement> | undefined;
//     setMenuState: (event: React.MouseEvent<HTMLDivElement>) => void;
// }

// export function MainLayout({ isOpen, ref, setMenuState }: HeaderProps) {

interface RegisterPageProps {
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
        return "";
    }
    return "";
}

export function RegisterPage({handleAuthToken}: RegisterPageProps) {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className="text-2xl text-center mb-[1rem]">Register a New Account</h2>
            <UsernamePasswordForm onSubmit={(username, password) => handleSubmit({ username, password, handleAuthToken, navigate })} formType="Register" />
        </div>
        
    )
}