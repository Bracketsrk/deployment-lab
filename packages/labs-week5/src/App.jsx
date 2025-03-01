import TodoItem from "./components/TodoItem";
import AddTaskForm from "./components/AddTaskForm";
import Modal from "./components/Modal";
import { GroceryPanel } from "./GroceryPanel";
import { useState } from "react";
import { nanoid } from "nanoid";

const INITIAL_TASK_LIST = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Rave", completed: false },
    { id: "todo-3", name: "Repeat", completed: false },
  ];

// var modalIsOpen = Boolean(true);

function App() {
    const [taskList, setTaskList] = useState(INITIAL_TASK_LIST);
    const [modalState, setModalState] = useState(false);
    // console.log("here");

    function addTask(taskName) {
        if (taskName === "") {
            return;
        }
        const newTask = { id: `todo-${nanoid()}`, name: taskName, completed: false };
        setTaskList([...taskList, newTask]);
        onCloseRequested();
    }

    function toggleCompletion(taskId) {
        const updatedTasks = taskList.map((task) => {
            if (task.id === taskId) {
              // use object spread to make a new object
              // whose `completed` prop has been inverted
              return { ...task, completed: !task.completed };
            }
            return task;
          });
        //   console.log(updatedTasks);
          setTaskList(updatedTasks);
        //   console.log(taskList);
    }

    function onCloseRequested () {
        setModalState(false);
    }

    // function toggleModal() {
    //     alert("blah");
    // }

    function deleteTask(taskId) {
        // console.log("here4");
        // const taskInd = taskList.findIndex(item => item.id === taskId);
        // const newTaskList = [taskList.slice(0, taskInd), taskList.slice(taskInd, -1)];
        const newTaskList = taskList.filter(task => task.id !== taskId);
        setTaskList(newTaskList);
    }

    const taskElements = taskList?.map((task) => (
        <TodoItem id={task.id} name={task.name} completed={task.completed} key={task.id} onToggleCompletion={toggleCompletion} onDeleteTask={deleteTask} />
    ));
    

    return (
        <main className="m-4 flex flex-col gap-2"> {/* Tailwind: margin level 4 on all sides 
*/}


            {/* <AddTaskForm onNewTask={addTask} /> */}
            <Modal 
                children={<AddTaskForm onNewTask={addTask} />} 
                headerLabel={
                    <div className="flex justify-between text-lg pb-[1rem]"> 
                        <h2 className="text-left">New Task</h2>
                        <h2 onClick={onCloseRequested} className="text-right text-gray-500 aria-label='Close'">X</h2> 
                    </div>}
                isOpen={modalState}
                clickedOutside={onCloseRequested}
            />

            {/* <button onClick={() => setTaskList([])} className="p-1 bg-red-600 text-white">Delete all</button> */}
            {/* <button className="p-1 bg-blue-500 text-white" onClick={() => addTask("blah")}>New But Can't Set Name</button> */}
            {/* <button className="p-1 bg-blue-500 text-white" onClick={() => toggleModal()}>New But Can't Set Name</button> */}

            <button onClick={() => setModalState(true)} className="text-white min-w-20 max-w-30 bg-blue-600 hover:bg-blue-800 rounded px-[0.5rem] py-[0.25rem]">Add task</button>

            <section className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">To do</h1>

                <ul role="list">
                    {taskElements}
                </ul>

            </section>


            <GroceryPanel onAddTask={addTask}/>
            
        </main>
    );
}

export default App;
