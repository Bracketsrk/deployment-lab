import { useRecipeFetching } from "./useRecipeFetching.js";
import { useParams } from "react-router";

interface IRecipeData {
    _id: string,
    src: string,
    name: string,
    ingredients: string,
    recipe: string,
    author: string
}

export function Recipe() {
    const { recipeId } = useParams();
    // const { isLoading, fetchedRecipes } = useRecipeFetching(recipeId, 500);

    const { data, error, isLoading } = useRecipeFetching();

    if (isLoading) {
      return <div>Loading recipes...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    // console.log(recipeId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Couldn't fetch recipe data</div>;
    }
    // const recipeData = fetchedRecipes[0];
    // const imageData = data.find(image => image._id === imgId);
    const recipeData = data.find(recipe => recipe._id === recipeId);
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