import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { useNavigate } from "react-router-dom";
import RecipeContext from "../context/RecipeContext";
import axios from 'axios';

const EditRecipe = () => {
    const {recipes, setRecipes} = useContext(RecipeContext)
    const { id } = useParams();
    const recipeToEdit = recipes.find((recipe: any) => recipe.id === id)
    const navigate = useNavigate();

    const handleOnSubmit = (recipe: any) => {
        const filteredRecipes = recipes.filter((recipe: any) => recipe.id !== id);
        setRecipes([recipe, ...filteredRecipes])
        axios.post('/api/recipe', { recipe }).then(res => {
            console.log(res.data)
        })
        navigate('/recipes');
    }

    return (
        <div>
            <RecipeForm recipe={recipeToEdit} handleOnSubmit={handleOnSubmit}></RecipeForm>
        </div>
    )
}

export default EditRecipe;