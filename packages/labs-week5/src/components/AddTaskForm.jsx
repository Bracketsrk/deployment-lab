import { useState } from "react";

export default function AddTaskForm({onNewTask}) {
    const [taskName, setTaskName] = useState("");

    function handleChange(event) {
        setTaskName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // addTask(taskName);
        setTaskName("");
    }
    
    return (
        <form className="flex gap-2" onSubmit={handleSubmit}> 
            <input className="outline p-[0.2rem] pl-[.5rem] rounded" placeholder="New task name" value={taskName} onChange={handleChange} />
            <button onClick={() => onNewTask(taskName)} className="text-white bg-blue-600 hover:bg-blue-800 rounded px-[0.5rem] py-[0.25rem]">Add task</button>
        </form>
    );
}
