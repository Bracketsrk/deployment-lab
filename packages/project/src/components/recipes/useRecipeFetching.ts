import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'

// const RECIPES = [
//     {
//         id: "0",
//         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Pancake-3529653_1280.jpg/640px-Pancake-3529653_1280.jpg",
//         name: "Pancakes",
//         ingredients: "1½ cups all-purpose flour, 3½ teaspoons baking powder, 1 tablespoon white sugar, ¼ teaspoon salt( or more to taste), 1¼ cups milk, 3 tablespoons butter (melted), 1 large egg",
//         recipe: "Sift flour, baking powder, sugar, and salt together in a large bowl. Make a well in the center and add milk, melted butter, and egg; mix until smooth.{??}Heat a lightly oiled griddle or pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake; cook until bubbles form and the edges are dry, about 2 to 3 minutes. Flip and cook until browned on the other side. Repeat with remaining batter. "
//     },
//     {
//         id: "1",
//         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hash_browns_with_eggs.jpg/640px-Hash_browns_with_eggs.jpg",
//         name: "Eggs and Hash Browns",
//         ingredients: "3 large eggs, 2 medium russet potatoes (shredded), ½ medium onion (finely chopped), ¼ cup all-purpose flour, 1 cup oil for frying (or as needed), salt and pepper to taste",
//         recipe: "Rinse shredded potatoes until water is clear, then drain and squeeze dry. Place shreds in a bowl and mix in the onion, flour, and egg until evenly distributed.{??}Heat about 1/4 inch of oil in a large heavy skillet over medium-high heat. When oil is sizzling hot, place potatoes into the pan in a 1/2 inch thick layer. Cover the whole bottom of the pan, or make separate piles like pancakes.{??}Cook until nicely browned on the bottom, then flip over and brown on the other side. It should take at least 5 minutes per side. If you are cooking them in one big piece, it can be cut into quarters for easier flipping.{??}Remove from pan, and drain on paper towels. Season with salt and pepper and serve immediately."
//     },
//     {
//         id: "2",
//         src: "https://www.jessicagavin.com/wp-content/uploads/2021/03/ham-and-cheese-quiche-22-1200.jpg",
//         name: "Quiche",
//         ingredients: "1 single pie crust unbaked, 6 large eggs, ¾ cup milk or cream, ¾ teaspoon salt, ¼ teaspoon black pepper, 1 cup cubed cooked ham, 1½ cups shredded cheddar cheese divided, 3 tablespoons sliced green onions",
//         recipe: "Preheat oven to 375°F.{??}Unroll pie crust and press into a 9\" pie plate, crimping the top edges if desired.{??}In a large bowl, whisk together eggs, milk, salt and pepper.{??}Sprinkle ham, 1 cup of cheese, and green onions into the pie crust and pour the egg mixture over top. Sprinkle remaining ½ cup cheese on top of egg mixture.{??}Bake for 35-40 minutes until the center is completely set. Let cool for 5-10 minutes before slicing and serving."
//     },
//     {
//         id: "3",
//         src: "https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Chicken-Cordon-Bleu24-1-500x500.jpg",
//         name: "Chicken Cordon Bleu",
//         ingredients: "8 thin slices ham, 8 oz Swiss cheese sliced or shredded, 4 boneless skinless chicken breasts (about 2 pounds), salt and freshly ground black pepper, 3 cups corn flakes cereal (crushed {or substitute breadcrumbs}), 6 Tablespoons butter (melted), Sauce: 1 cup mayonnaise & 1-2 teaspoons yellow mustard (to taste)",
//         recipe: "Pat the chicken dry with paper towels. Use a sharp knife to cut each chicken breast in half horizontally to create two chicken breast halves.Place the chicken breast halves between two sheets of plastic wrap and use a meat mallet or rolling pin to pound them into thin and evenly (be careful not to pound so hard that the meat tears.).{??}Top each pieces of chicken with a slice of ham and a ham handful of shredded cheese. Roll tightly, tucking the sides a little, and place on a new piece of plastic wrap.{??}Wrap the chicken tightly in the plastic wrap, pinching the excess plastic on the sides to create a tootsie-roll shape and twisting them to create a firm chicken roll. Refrigerate the wrapped chicken bundles for at least 30-minutes or up to one day in advance.{??}Preheat oven to 400 degrees F. Remove chicken from fridge, unwrap and season with salt and pepper. Add cornflakes to a food processor and pulse into fine crumbs. Add crumbs to a shallow dish or pie plate. Melt butter in a separate shallow dish.{??}Dip the chicken bundles in melted butter, and then into the cornflake crumbs, pressing lightly to help the crumbs stick to the chicken. Transfer to a lightly greased baking sheet.{??}Bake on the center oven rack for about 30 minutes, or until chicken is cooked through (160 degrees on a thermometer inserted into the chicken, not the filling.){??}Make the sauce by stirring the mayo and mustard together. Taste and add more mustard, as needed, to taste. "
//     },
//     {
//         id: "4",
//         src: "https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-5.jpg",
//         name: "Chocolate Chip Cookies",
//         ingredients: "1 cup salted butter softened, 1 cup granulated sugar, 1 cup light brown sugar packed, 2 teaspoons pure vanilla extract, 2 large eggs, 3 cups all-purpose flour, 1 teaspoon baking soda, ½ teaspoon baking powder, 1 teaspoon sea salt, 2 cups chocolate chips (12 oz)",
//         recipe: "Preheat oven to 375 degrees F. Line three baking sheets with parchment paper and set aside.{??}In a medium bowl mix flour, baking soda, baking powder and salt. Set aside.{??}Cream together butter and sugars until combined.{??}Beat in eggs and vanilla until light (about 1 minute).{??}Mix in the dry ingredients until combined.{??}Add chocolate chips and mix well.{??}Roll 2-3 Tablespoons (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets.{??}Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just barely starting to turn brown.{??}Let them sit on the baking pan for 5 minutes before removing to cooling rack."
//     }
// ];

// interface IRecipeData {
//     _id: string,
//     src: string,
//     name: string,
//     recipe: string,
//     ingredients: string,
//     author: string
// }

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedRecipes: RecipeData[]}} fetch state and data
 */
// export function useRecipeFetching(recipeId: string | undefined, delay=1000) {
//     const [isLoading, setIsLoading] = useState(true);
//     const [fetchedRecipes, setFetchedRecipes] = useState<IRecipeData[]>([]);
//     useEffect(() => {
//         setTimeout(() => {
//             if (recipeId === "") {
//                 setFetchedRecipes(RECIPES);
//             } else {
//                 setFetchedRecipes(RECIPES.filter((recipe) => recipe.id === recipeId));
//             }
//             setIsLoading(false);
//         }, delay);
//     }, [recipeId]);

//     return { isLoading, fetchedRecipes };
// }

interface IRecipeData {
    _id: string,
    src: string,
    name: string,
    ingredients: string,
    recipe: string,
    author: string
}

const fetchRecipes = async (): Promise<IRecipeData[]> => {
    const response = await fetch('/api/recipes');
    
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
  
  export function useRecipeFetching() {
    return useQuery({
      queryKey: ['recipes'], 
      queryFn: fetchRecipes,
    });
  };