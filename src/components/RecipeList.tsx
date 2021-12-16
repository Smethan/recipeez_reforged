import React, {useContext} from "react";
import _ from "lodash";
import Recipe from './Recipe';
import RecipeContext from "../context/RecipeContext";
import axios from 'axios';



const RecipeList = () => {
    const {recipes, setRecipes} = useContext(RecipeContext)

    const handleRemoveRecipe = (id: any) => {
        setRecipes(recipes.filter((recipe: any) => recipe.id !== id));
        axios.get(`/api/delete/${id}`).then(res => {console.log(res)})
    }
    
    return (
        <>
            <div className="book-list">
                {!_.isEmpty(recipes) ? (
                    recipes.map((recipe: any, i: number) => (
                        <Recipe key={i} {...recipe} handleRemoveRecipe={handleRemoveRecipe}/>
                    ))
                ) : (
                        <p className="message">No Recipes available</p>
                )}
            </div>
        </>
    )
}

export default RecipeList;