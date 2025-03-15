import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { AddIngrForm } from "./AddIngrForm.jsx";
import { Ingredient } from "./Ingredient.jsx"

interface IIngredientData {
    id: string,
    name: string,
    num: number
}

export function Ingredients() {
    const [ingredientList, setIngrList] = useState((): IIngredientData[] => {
        const ingredients = localStorage.getItem('ingredients');
        
        try {
          // Try parsing the ingredients
          return ingredients ? JSON.parse(ingredients) : [];
        } catch (e) {
          // If JSON.parse fails, log the error and return an empty array
          console.error("Error parsing ingredients from localStorage:", e);
          return [];
        }
      });

    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(ingredientList));
    }, [ingredientList]);

    function addIngredient(ingredientName: string, ingredientNum: string) {
        if (ingredientName.trim() === "") {
            return;
        }
        const ingrNum = Number(ingredientNum);
        if (Number.isNaN(ingrNum) || ingrNum == 0){
            console.log("blah");
            return;
        }
        // console.log(ingrNum);
        const newIngr = { id: `todo-${nanoid()}`, name: ingredientName, num: ingrNum};
        setIngrList([...ingredientList, newIngr]);
    }

    function deleteIngr(ingrId: string) {
        const newIngrList = ingredientList.filter(ingr => ingr.id !== ingrId);
        setIngrList(newIngrList);
    }

    const ingredientElements = ingredientList?.map((ingr) => (
        <Ingredient id={ingr.id} name={ingr.name} num={ingr.num} key={ingr.id} onDeleteIngr={deleteIngr} />
    ));

    return (
        <>
        <div>
            <AddIngrForm onNewIngr={addIngredient}/>

            <section className="flex flex-col gap-1 mt-[1rem]">
                <h1 className="text-2xl font-bold text-center">Ingredients</h1>
                <hr className="mt-[.25rem] mb-[1rem]" />
                
                <table className="table-auto w-full text-xl border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 p-2 text-left">Ingredient</th>
                            <th className="border-b-2 p-2 text-left">Amount</th>
                            <th className="border-b-2 p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientElements}
                    </tbody>
                </table>
                {/* <ul role="list" className="text-xl">
                    {ingredientElements}
                </ul> */}

            </section>
            
        </div>
        </>
    )
}