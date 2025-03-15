import { useRef, useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router";
import { MainLayout } from "./MainLayout.jsx";
import { Recipe } from './components/recipes/Recipe.jsx';
import { Recipes } from './components/recipes/Recipes.jsx';
import { Ingredients } from './components/ingredients/Ingredients.jsx';
import { useRecipeFetching } from "./components/recipes/useRecipeFetching.js";
import { Home } from './components/Home.jsx';

import './App.css'

function App() {
  const [menuIsOpen, setMenu] = useState(false);
  // const menuRef = useRef(null)
  // const menuRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggleMenu() {
    // console.log("Changing");
    // console.log(menuIsOpen);
    setMenu(!menuIsOpen);
  }

  const checkMenu = (e: MouseEvent) => {
    if (menuIsOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
      toggleMenu();
    }
  }

  useEffect(() => {
    // Add event listener on mount
    const handleClickOutside = (e: MouseEvent) => checkMenu(e);

    document.body.addEventListener('click', handleClickOutside);
  }, [menuIsOpen]);


  const { isLoading, fetchedRecipes } = useRecipeFetching("");

  const recipeElements = fetchedRecipes.map((recipe) => (
      <div key={recipe.id}>
          <Link to={"/recipes/" + recipe.id}>
              <img src={recipe.src} alt={recipe.name}/>
              <p className="text-md font-bold text-center p-[.5rem]">{recipe.name}</p>
          </Link>
      </div>
  ));

  function getRandomRecipe() {
    return Math.floor(Math.random() * recipeElements.length);
  }

  return (
    // <main onClick={checkMenu}>
      <Routes>
            <Route path="/" element={<MainLayout ref={menuRef} isOpen={menuIsOpen} setMenuState={toggleMenu} />}>
                <Route index element={<Home randomId={getRandomRecipe()} />}/>
                <Route path="/recipes" element={<Recipes isLoading={isLoading} recipeElements={recipeElements}/>} />
                <Route path="/recipes/:recipeId" element={<Recipe />} />
                <Route path="/ingredients" element={<Ingredients />} />
            </Route>
        </Routes>
        // <Recipe menuRef={menuRef} isOpen={menuIsOpen} setMenuState={toggleMenu} />
    // </main>
  );
}

export default App
