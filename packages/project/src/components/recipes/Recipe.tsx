import { useRecipeFetching } from "./useRecipeFetching.js";
import { useParams } from "react-router";

export function Recipe() {
    const { recipeId } = useParams();
    const { isLoading, fetchedRecipes } = useRecipeFetching(recipeId, 500);
    // console.log(recipeId);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const recipeData = fetchedRecipes[0];
    if (!recipeData) {
        return <div><h2>Recipe not found</h2></div>;
    }
    const ingredients = recipeData.ingredients.split(','); 
    const recipe = recipeData.recipe.split('{??}');


    return (
        <div className="flex flex-col justify-stretch gap-[1rem] mb-[4rem]">
            <div className="flex flex-col">
                <h2 className="self-center text-2xl font-bold mb-[.5rem]">{recipeData.name}</h2>
                <hr className="mb-[.8rem]" />
            </div>
            <img className="max-w-[20rem] self-center" src={recipeData.src} alt={recipeData.name} />
            <div className="text-lg">
                {ingredients.map((item, index) => (
                <span key={index} className="py-[1rem]">
                    • {item}
                    <br />
                </span>
            ))}
            </div>
            <br></br>
            <div className="text-lg bg-white border border-gray-300 rounded-md shadow-lg w-full p-[1rem]">
                {recipe.map((paragraph, index) => (
                <span key={index} className="py-[1rem]">
                    {paragraph}
                    {index !== recipe.length - 1 && <><br /><br /></>} {/* Don't add extra br's on last paragraph */}
                </span>
            ))}
            </div>

        </div>
    );

}