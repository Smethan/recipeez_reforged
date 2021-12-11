import React, {useContext} from "react";
import RecipeForm from './RecipeForm';
import { useNavigate } from "react-router";
import RecipeContext from "../context/RecipeContext";

const AddRecipe = () => {
    const navigate = useNavigate()
    const {recipes, setRecipes} = useContext(RecipeContext)

    const handleOnSubmit = (recipe: any) => {
        setRecipes([recipe, ...recipes]);
        navigate('/recipes')
    }

    return (
        <>
            <RecipeForm handleOnSubmit={handleOnSubmit}></RecipeForm>
        </>
    )
}

export default AddRecipe;