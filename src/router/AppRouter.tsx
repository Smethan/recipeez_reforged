import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "../components/Header";
import AddRecipe from "../components/AddRecipe";
import RecipeList from "../components/RecipeList";
import useLocalStorage from '../hooks/useLocalStorage';
import EditRecipe from "../components/EditRecipe";
import { Navigate } from "react-router-dom";
import RecipeContext from "../context/RecipeContext";
import RecipeDisplay from "../components/RecipeDisplay";
import Home from "../components/Home";

const AppRouter = () => {
    const [recipes, setRecipes] = useLocalStorage('recipes', [])
    
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <div className='main-content'>
                    <RecipeContext.Provider value={{recipes, setRecipes}}>
                        <Routes>
                            <Route element={<Home/>} path='/'/>
                            <Route element={<RecipeList />} path='/recipes' />
                            <Route element={
                                <AddRecipe />
                            } path='/add' />
                            <Route element={<EditRecipe />} path='/edit/:id' />
                            <Route element={<RecipeDisplay/>} path='/recipe/:id'/>
                            <Route element={<Navigate replace to='/'/>}/>
                        </Routes>
                    </RecipeContext.Provider>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;