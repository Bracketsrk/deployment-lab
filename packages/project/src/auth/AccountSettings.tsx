import { ProtectedRoute } from "./ProtectedRoute";
import { useActionState } from "react";
import { sendPostRequest } from "../requests/sendPostRequest";


// export function AccountSettings({authToken, updateUser}: {authToken: string, updateUser: (value: any) => void}) {

async function onSubmit(oldPass: string, newPass: string, authToken: string): Promise<string> {
    const response = await sendPostRequest("/auth/changePassword", {password: oldPass, newPassword: newPass, jwt: authToken});
    const body = await response.text();
    return body;
}

export function AccountSettings({authToken}: {authToken: string}) {

    function updateUser(value: any) {
        return;
    }

    const [result, submitAction, isPending] = useActionState(
            async (previousState: any, formData: FormData) => {
                const oldPass = formData.get("old-pass")
                const newPass = formData.get("new-pass");
                const newPassConfirm = formData.get("new-pass-confirm");
                
                if (typeof oldPass !== "string" || typeof newPass !== "string" || typeof newPassConfirm !== "string") {
                    return {
                        type: "error",
                        message: "Please enter valid password strings.",
                    };
                    }
        
                if (!(newPass === newPassConfirm)) {
                    return {
                        type: "error",
                        message: "New password doesn't match confirmation."
                    }
                }

                const submitResult = await onSubmit(oldPass, newPass, authToken);

                if (submitResult) {
                    const result = await JSON.parse(submitResult);
                    console.log(result.message);
                    return {
                        type: "error",
                        message: result.message, 
                    };
                }
        
                },
                null
          );

    return (
        <div>
            <ProtectedRoute authToken={authToken}>
                <div>
                    {!isPending && result && result.type === "error" && <p className={`message ${result.type} text-center mb-[1rem]`}><span style={{ color: "red" }}>{result.message}</span></p>}
                    {isPending && <p className="message loading">Loading ...</p>}
                    {!isPending &&
                        <form className="flex flex-col gap-[1rem] items-end text-lg">
                            <label>
                                Current password: <input className="text-lg outline p-[0rem] pl-[.5rem] ml-[1rem]" name="old-pass" type="password" placeholder="Current password" />
                            </label>
                            <label>
                                New password: <input className="text-lg outline p-[0rem] pl-[.5rem] ml-[1rem]" name="new-pass" type="password" placeholder="New password" />
                            </label>
                            <label>
                                Confirm new password: <input className="text-lg outline p-[0rem] pl-[.5rem] ml-[1rem]" name="new-pass-confirm" type="password" placeholder="Confirm new password" />
                            </label>
                            <button className="text-lg text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.5rem] cursor-pointer" formAction={submitAction}>Change password</button>
                        </form>
                    }
                </div>
            </ProtectedRoute>
        </div>
    );
}
