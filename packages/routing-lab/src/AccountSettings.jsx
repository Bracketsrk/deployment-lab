export function AccountSettings(props) {


    return (
        <div>
            <h2>Account settings</h2>
            <label>
                Username <input onChange={(e) => props.updateUser(e.target.value)} />
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
