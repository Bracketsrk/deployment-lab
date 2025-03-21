import { Link } from "react-router";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { useRecipeFetching } from "./recipes/useRecipeFetching";
import kitchen from '../assets/images/kitchen.jpg';

export function Home({authToken}: {authToken: string}) {


  let isLoading = false;
  let recipeElements = "";
  if (authToken) {
      // const { isLoading, fetchedRecipes } = useRecipeFetching("");
    const { data, error, isLoading } = useRecipeFetching(authToken);
    
    if (!data) {
      return;
    }

    const recipeElements = data.map(recipe => (
        <div key={recipe._id}>
            <Link to={"/recipes/" + recipe._id}>
                <img src={recipe.src} alt={recipe.name}/>
                <p className="text-md font-bold text-center p-[.5rem]">{recipe.name}</p>
            </Link>
        </div>
    ));
  }

    function getRandomRecipe() {
        return Math.floor(Math.random() * recipeElements.length);
      }

    return (
        <>
        <ProtectedRoute authToken={authToken}>
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
                    <Link className="text-xl text-white text-center bg-orange-900 hover:bg-orange-950 rounded px-[0.5rem] py-[0.5rem] cursor-pointer" to={"/recipes/" + getRandomRecipe()}>Random Recipe</Link>
                </div>
                <img className="mb-[3rem]" src={kitchen} />
            </div>
        </ProtectedRoute>
        </>
    )
}