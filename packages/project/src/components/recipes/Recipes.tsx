export function Recipes({isLoading, recipeElements}: {isLoading: boolean, recipeElements: any}) {

    return (
            <>
                <div>
                    {isLoading && "Loading..."}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-[2rem]">
                        {recipeElements}
                    </div>
                </div>
            </>
        )
}