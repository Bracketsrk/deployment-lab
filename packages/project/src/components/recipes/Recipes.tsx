import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { useRecipeFetching } from "./useRecipeFetching";
import { Link } from "react-router";

export function Recipes({authToken}: {authToken: string}) {

    const { data, error, isLoading } = useRecipeFetching(authToken);
    
    // if (isLoading) {
    //   return <div>Loading recipes...</div>;
    // }

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // }

    if (!data) {
      return <ProtectedRoute authToken={authToken}><div>Couldn't fetch recipe data</div>;</ProtectedRoute>
    }

    const recipeElements = data.map(recipe => (
        <div key={recipe._id}>
            <Link to={"/recipes/" + recipe._id}>
                <img src={recipe.src} alt={recipe.name}/>
                <p className="text-md font-bold text-center p-[.5rem]">{recipe.name}</p>
            </Link>
        </div>
    ));

    return (
            <>
                <ProtectedRoute authToken={authToken}>
                <div>
                    {isLoading && "Loading..."}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-[2rem]">
                        {recipeElements}
                    </div>
                </div>
                </ProtectedRoute>
            </>
        )
}