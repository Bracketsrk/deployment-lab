import { useActionState } from "react";


export function UsernamePasswordForm(props) {

    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
          const user = formData.get("username");
          const pass = formData.get("password");
          if (!user || !pass) {
            return {
              type: "error",
              message: `Please enter a username and password.`,
            };
          }
    
        //   console.log(`${user}, ${pass}`);
        //   await fakeSendEmail();
        const submitResult = await props.onSubmit(user, pass);

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
            {!isPending && result && result.type === "error" && <p className={`message ${result.type}`}><span style={{ color: "red" }}>{result.message}</span></p>}
            {isPending && <p className="message loading">Loading ...</p>}
            {!isPending &&
                <form >
                    {/* <label htmlFor="username">Username:</label><br/> */}
                    <input type="text" name="username" placeholder="Username" /><br/><br/>
                    {/* <label htmlFor="password">Password:</label><br/> */}
                    <input type="password" name="password" placeholder="Password" /><br/><br/>
                    <button formAction={submitAction}>{props.formType}</button>
                </form>
            }
        </div>
    );
}