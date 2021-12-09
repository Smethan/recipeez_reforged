import React from "react";
import { IRecipeContext } from "../type";

const RecipeContext = React.createContext<IRecipeContext>({} as IRecipeContext);

export default RecipeContext;