import { useState } from "react";

export function AddIngrForm({onNewIngr}) {
    const [ingredientName, setIngrName] = useState("");
    const [ingredientNum, setIngrNum] = useState("");

    function handleChange(event) {
        setIngrName(event.target.value);
    }

    function handleChange2(event) {
        setIngrNum(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIngrName("");
        setIngrNum("");
    }
    
    return (
        <form className="flex gap-2 w-full" onSubmit={handleSubmit}> 
            <input className="text-lg outline p-[0.2rem] pl-[.5rem] rounded" placeholder="New ingredient name" value={ingredientName} onChange={handleChange} />
            <input className="text-lg outline p-[0.2rem] pl-[.5rem] rounded max-w-[3rem]" placeholder="#" value={ingredientNum} onChange={handleChange2} />
            <button onClick={() => onNewIngr(ingredientName, ingredientNum)} className="text-lg text-white bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.25rem] cursor-pointer">Add ingredient</button>
        </form>
    );
}
