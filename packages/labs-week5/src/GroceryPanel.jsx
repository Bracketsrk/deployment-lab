import React, { useEffect } from "react";
import { Spinner } from "./components/Spinner";
import { useGroceryFetch } from "./useGroceryFetch";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [filter, setFilter] = React.useState("MDN");
    const {groceryData, isLoading, filterError} = useGroceryFetch(filter);


    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.onAddTask(todoName);
    }

    function handleDropdownChange(changeEvent) {
        if (changeEvent.target.value && changeEvent.target.value.trim() == "") {
            return;
        }
        setFilter(changeEvent.target.value);
        // fetchData(changeEvent.target.value);
    }


    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                {/* disabled={isLoading} */}
                <select className="border border-gray-300 p-1 rounded-sm disabled:opacity-50" onChange={handleDropdownChange} value={filter}>
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>
                {isLoading && (<Spinner />)}
                {filterError && <p className="text-red-500">Something went wrong</p>}
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left pr-[8rem]">Name</th>
                <th className="">Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td className="pr-[8rem] py-[.15rem]">{item.name}</td>
            <td className="pl-[2rem] pr-[2rem]">${item.price.toFixed(2)}</td>
            <td >
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
