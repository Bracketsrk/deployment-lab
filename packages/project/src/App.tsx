import { useRef, useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router";
import { MainLayout } from "./MainLayout.jsx";
import { Recipe } from './components/recipes/Recipe.jsx';
import { Recipes } from './components/recipes/Recipes.jsx';
import { Ingredients } from './components/ingredients/Ingredients.jsx';
import { useRecipeFetching } from "./components/recipes/useRecipeFetching.js";
import { Home } from './components/Home.jsx';
import { RegisterPage } from './auth/RegisterPage.js';
import { LoginPage } from './auth/LoginPage.js';
import { AccountSettings } from './auth/AccountSettings.js';

import './App.css'

// interface IRecipeData {
//   _id: string,
//   src: string,
//   name: string,
//   ingredients: string,
//   recipe: string,
//   author: string
// }

function App() {
  const [authToken, setAuthToken] = useState("");
  function handleAuthToken(token: string) {
    setAuthToken(token);
  }

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
  
  // console.log("here");
  // console.log(recipeElements);


  return (
    // <main onClick={checkMenu}>
      <Routes>
            <Route path="/" element={<MainLayout ref={menuRef} isOpen={menuIsOpen} setMenuState={toggleMenu} />}>
                <Route index element={<Home authToken={authToken} />}/>
                <Route path="/recipes" element={<Recipes authToken={authToken} />} />
                <Route path="/recipes/:recipeId" element={<Recipe authToken={authToken} />} />
                <Route path="/ingredients" element={<Ingredients authToken={authToken} />} />
                <Route path="/register" element={<RegisterPage handleAuthToken={handleAuthToken} />} />
                <Route path="/login" element={<LoginPage handleAuthToken={handleAuthToken} />} />
                <Route path="/account" element={<AccountSettings authToken={authToken} />} />
            </Route>
        </Routes>
        // <Recipe menuRef={menuRef} isOpen={menuIsOpen} setMenuState={toggleMenu} />
    // </main>
  );
}

export default App
