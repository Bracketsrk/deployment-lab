import { Link } from "react-router";
import kitchen from '../assets/images/kitchen.jpg';

export function Home(props) {
    return (
        <>
        <div className="flex flex-col gap-[1rem]">
            <div className="max-h-[20rem] border border-gray-300 rounded-lg shadow-lg p-[1rem]">
                <p className="text-3xl text-center mb-[1rem]">Welcome to your kitchen!</p>
                <hr />
                <p className="text-xl mt-[1rem]" >You can add ingredients, recipes, and see what you can make with them!</p>
                <p></p>
            </div>
            <Link className="text-xl col-start-1 col-end-3 text-center text-white bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.5rem] cursor-pointer" to={"/recipes"}>Check out recipes</Link>
            <div className="grid md:grid-cols-2 w-full gap-[1rem]">
                <Link className="text-xl text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.5rem] cursor-pointer" to={"/ingredients"}>Add ingredients</Link>
                <Link className="text-xl text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.5rem] cursor-pointer" to={"/recipes/" + props.randomId}>Random Recipe</Link>
            </div>
            <img className="mb-[3rem]" src={kitchen} />
        </div>
        </>
    )
}