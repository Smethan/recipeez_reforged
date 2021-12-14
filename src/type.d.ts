import React from 'react';

interface IIngredient {
    name: string,
    amount: number,
    measurement: string
}
interface IRecipe {
    id: string,
    author_id: number,
    name: string,
    ingredients: IIngredient[],
    image?: string,
}

interface IRecipeContext {
    recipes: IRecipe[],
    setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>
}

interface IUser {
    user_id: string,
    name: string
}