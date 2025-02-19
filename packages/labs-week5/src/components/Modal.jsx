export default function Modal(props) {
    const handleInnerClick = (e) => {
        e.preventDefault();
    };

    const handleOuterClick = (e) => {
        if (e.defaultPrevented) return; 
        props.clickedOutside();
    };

    if (props.isOpen) {
        return (
            <div onClick={handleOuterClick} className="flex justify-center items-center h-screen w-screen top-0 left-0 bg-sky-950/40 absolute z-0">
                <div onClick={handleInnerClick} className="text-center bg-white rounded-md px-[1rem] pb-[1.5rem] pt-[.5rem] h-5vh w-10vh">
                    <header>
                    {props.headerLabel}
                    </header>
                {props.children}
                </div>
            </div>
        );
    }

    else {
        return null;
    } 
}
