import React from 'react';

interface IRecipe {
    id: number,
    author_id: number,
    name: string,
    ingredients: string[],
}

interface IRecipeContext {
    recipes: IRecipe[],
    setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>
}