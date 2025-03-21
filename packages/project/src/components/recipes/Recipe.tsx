import { useRecipeFetching } from "./useRecipeFetching.js";
import { useParams } from "react-router";
import { ProtectedRoute } from "../../auth/ProtectedRoute.js";

interface IRecipeData {
    _id: string,
    src: string,
    name: string,
    ingredients: string,
    recipe: string,
    author: string
}

export function Recipe({authToken}: {authToken: string}) {
    const { recipeId } = useParams();
    // const { isLoading, fetchedRecipes } = useRecipeFetching(recipeId, 500);

    const { data, error, isLoading } = useRecipeFetching(authToken);

    if (isLoading) {
      return <ProtectedRoute authToken={authToken}><div>Loading recipes...</div>;</ProtectedRoute>
    }

    if (error) {
      return <ProtectedRoute authToken={authToken}><div>Error: {error.message}</div>;</ProtectedRoute>
    }

    // console.log(recipeId);

    if (isLoading) {
        return <ProtectedRoute authToken={authToken}><div>Loading...</div>;</ProtectedRoute>
    }

    if (!data) {
        return <ProtectedRoute authToken={authToken}><div>Couldn't fetch recipe data</div>;</ProtectedRoute>
    }
    // const recipeData = fetchedRecipes[0];
    // const imageData = data.find(image => image._id === imgId);
    const recipeData = data.find(recipe => recipe._id === recipeId);
    if (!recipeData) {
        return <ProtectedRoute authToken={authToken}><div><h2>Recipe not found</h2></div>;</ProtectedRoute>
    }
    const ingredients = recipeData.ingredients.split(','); 
    const recipe = recipeData.recipe.split('{??}');


    return (
        <ProtectedRoute authToken={authToken}>
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
        </ProtectedRoute>
    );

}