import React, {useContext} from "react";
import _ from "lodash";
import Recipe from './Recipe';
import RecipeContext from "../context/RecipeContext";



const RecipeList = () => {
    const {recipes, setRecipes} = useContext(RecipeContext)

    const handleRemoveRecipe = (id: any) => {
        setRecipes(recipes.filter((recipe: any) => recipe.id !== id));
    }
    
    return (
        <>
            <div className="book-list">
                {!_.isEmpty(recipes) ? (
                    recipes.map((recipe: any) => (
                        <Recipe key={recipe.id} {...recipe} handleRemoveRecipe={handleRemoveRecipe}/>
                    ))
                ) : (
                        <p className="message">No Recipes available</p>
                )}
            </div>
        </>
    )
}

export default RecipeList;