import React, {useContext} from "react";
import RecipeForm from './RecipeForm';
import { useNavigate } from "react-router";
import RecipeContext from "../context/RecipeContext";
import axios from 'axios';
import {validate} from 'uuid'

const AddRecipe = () => {
    const navigate = useNavigate()
    const {recipes, setRecipes} = useContext(RecipeContext)

    const handleOnSubmit = (recipe: any) => {
        axios.post('/api/recipe', { recipe }).then(
            res => {
                console.log(res)
                console.log(res.data)
                if (validate(res.data.id)) {
                    console.log(`setting recipe id: ${res.data.id}`)
                    recipe.id = res.data.id
                    setRecipes([recipe, ...recipes]);
                }
            }
        )
        


        navigate('/recipes')
    }

    return (
        <>
            <RecipeForm handleOnSubmit={handleOnSubmit}></RecipeForm>
        </>
    )
}

export default AddRecipe;