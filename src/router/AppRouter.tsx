import React, {useEffect} from "react";
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
import UserContext from "../context/UserContext";
import axios from 'axios';

const AppRouter = () => {
    const [recipes, setRecipes] = useLocalStorage('recipes', [])
    const test_id = "82349574-aac7-482e-a03d-7cfc49ac1f6e"
    const test_name = "Ethan"

    useEffect(() => {
        axios.get(`/api/recipes/${test_id}`).then(res => {
            console.log(res)
            setRecipes(res.data)
        })
    }, [])
    
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <div className='main-content'>
                    <RecipeContext.Provider value={{recipes, setRecipes}}>
                        <UserContext.Provider value={{user_id: test_id, name: test_name}}>
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
                        </UserContext.Provider>
                    </RecipeContext.Provider>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;