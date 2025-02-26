export function Recipes(props) {

    return (
            <>
                <div>
                    {props.isLoading && "Loading..."}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-[2rem]">
                        {props.recipeElements}
                    </div>
                </div>
            </>
        )
}