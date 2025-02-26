import { Link } from "react-router";

export function Header(props) {

    if (props.isOpen) {
        return (
            <>
            <div ref={props.ref} className="flex justify-between items-start w-full select-none">
                <Link to={"/"}><h1 className="border-b-2 border-black-900 text-4xl font-bold ml-[1rem] mt-[.5rem] py-[.5rem] mb-[1rem] cursor-pointer">Reci-keeper</h1></Link>
                <div className="text-3xl pl-4 fixed right-[.5rem] top-0" onClick={props.setMenuState}>
                    <div className="flex justify-end text-5xl mr-[1rem] cursor-pointer">
                        &#9776;
                    </div>
                    <nav className="text-xl bg-white border border-gray-300 rounded-lg shadow-lg w-32">
                        <ul className="flex flex-col items-end mr-[1rem] space-y-2 py-2">
                            <Link to={"/"}><li className="text-gray-800 hover:text-blue-600 ">Home</li></Link>
                            <Link to={"/recipes"}><li className="text-gray-800 hover:text-blue-600 ">Recipes</li></Link>
                            <Link to={"/ingredients"}><li className="text-gray-800 hover:text-blue-600 ">Ingredients</li></Link>
                            <li className="text-gray-800 hover:text-blue-600 " onClick={() => props.toggleTheme()}>Color</li>
                        </ul>
                    </nav>
                </div>
            </div>
            </>
        )
    }
    else {
        return (
            <div ref={props.ref} className="flex justify-between items-start w-full select-none">
                <Link to={"/"}><h1 className="border-b-2 border-black-900 text-4xl font-bold ml-[1rem] mt-[.5rem] py-[.5rem] mb-[1rem] cursor-pointer">Reci-keeper</h1></Link>
                <div className="text-5xl pl-4 mr-[1rem] cursor-pointer fixed right-[.5rem] top-0" onClick={props.setMenuState}>
                    <div>
                        &#9776;
                    </div>
                </div>
            </div>
        )
    }
    
}