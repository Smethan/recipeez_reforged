import React from 'react';

interface IIngredient {
    name: string,
    amount: number,
    measurement: string
}
interface IRecipe {
    id: number,
    author_id: number,
    name: string,
    ingredients: IIngredient[],
}

interface IRecipeContext {
    recipes: IRecipe[],
    setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>
}