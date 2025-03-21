import { useActionState } from "react";


interface UsernamePasswordFormProps {
  onSubmit: (username: string, password: string) => Promise<string | null>;
  formType: string;
}

export function UsernamePasswordForm({onSubmit, formType}: UsernamePasswordFormProps) {

    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: FormData) => {
          const user = formData.get("username");
          const pass = formData.get("password");
          
          if (typeof user !== "string" || typeof pass !== "string") {
            return {
              type: "error",
              message: "Please enter a valid username and password.",
            };
          }
    
        const submitResult = await onSubmit(user, pass);

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
            {!isPending && result && result.type === "error" && <p className={`message ${result.type} text-center mb-[1rem]`}><span style={{ color: "red" }}>{result.message}</span></p>}
            {isPending && <p className="message loading">Loading ...</p>}
            {!isPending &&
                <form className="flex flex-col gap-[1rem] items-end text-lg" >
                    {/* <label htmlFor="username">Username:</label><br/> */}
                    <input className="text-lg outline p-[0rem] pl-[.5rem] ml-[1rem]" type="text" name="username" placeholder="Username" />
                    {/* <label htmlFor="password">Password:</label><br/> */}
                    <input className="text-lg outline p-[0rem] pl-[.5rem] ml-[1rem]" type="password" name="password" placeholder="Password" />
                    <button className="text-lg text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[1.15rem] py-[0.5rem] mb-[1rem] cursor-pointer" formAction={submitAction}>{formType}</button>
                </form>
            }
        </div>
    );
}