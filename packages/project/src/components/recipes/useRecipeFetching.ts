import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'


interface IRecipeData {
    _id: string,
    src: string,
    name: string,
    ingredients: string,
    recipe: string,
    author: string
}

const fetchRecipes = async (authToken: string): Promise<IRecipeData[]> => {
    const response = await fetch('/api/recipes', {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });
    
    if (!response.ok) {
      throw new Error('Bad response');
    }
    
    const result = await response.json();
    console.log(result);
    // const data: IRecipeData[] = await response.json();
    if (result === undefined) {
        return [];
    }
    // console.log(data);
    return result; 
  };
  
  export function useRecipeFetching(authToken: string) {
    return useQuery({
      queryKey: ['recipes', authToken], 
      queryFn: () => fetchRecipes(authToken),
    });

  };