import { Header } from "./components/Header.jsx";
import { Outlet } from "react-router";
import { useState } from "react";

export function MainLayout(props) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        console.log(isDarkMode);
        setIsDarkMode((prev) => !prev);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');  
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex justify-end mb-[1rem]">
                    <Header ref={props.menuRef} isOpen={props.menuIsOpen} setMenuState={props.toggleMenu} toggleTheme={toggleTheme} />
                </div>
                <div style={{padding: "0 2em"}}>
                    {/* {props.children} */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
