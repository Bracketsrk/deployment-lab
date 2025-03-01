import React from "react";
import { useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [filterError, setFilterError] = React.useState(null);
    
    useEffect(() => {
        let isStale = false;

        function cleanup() {
            isStale = true;
         }
 
        async function fetchData(url) {
            if (!isStale) {
                setFilterError(false);
            } else {return}

            if (!isStale) {
                setGroceryData([]);
            } else {return}

            if (!isStale) {
                setIsLoading(true);
            } else {return}
            
            console.log("fetching data from " + url);
            try {
                const response = await groceryFetcher.fetch(url)

                if (!isStale) {
                    setIsLoading(false);
                }
                if (!isStale) {
                    setGroceryData(response)
                } else {return}
                return response;

            } catch (error) {
                if (!isStale) {
                    setIsLoading(false);
                } else {return}
                if (!isStale) {
                    setFilterError(true);
                } else {return}
                console.error(`Could not get products: ${error}`);
            }
        }

        fetchData(source);
        return cleanup;

        
    }, [source]);

    return {groceryData, isLoading, filterError};
}