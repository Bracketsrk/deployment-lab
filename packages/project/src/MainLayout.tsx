import { Header } from "./components/Header.jsx";
import { Outlet } from "react-router";
import { useState, Ref } from "react";

interface HeaderProps {
    isOpen: boolean;
    ref: Ref<HTMLDivElement> | undefined;
    setMenuState: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function MainLayout({ isOpen, ref, setMenuState }: HeaderProps) {
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
                    <Header ref={ref} isOpen={isOpen} setMenuState={setMenuState} toggleTheme={toggleTheme} />
                </div>
                <div style={{padding: "0 2em"}}>
                    {/* {props.children} */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
