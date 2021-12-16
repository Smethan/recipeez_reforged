import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import RecipeContext from '../context/RecipeContext';
import { IRecipe } from "../type";

const RecipeDisplay = () => {
    const { recipes } = useContext(RecipeContext)
    const { id } = useParams();
    const recipe = recipes.find((recipe: any) => recipe.id === id)
    const navigate = useNavigate()

    if (recipe !== undefined) {
        return (
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <Card style={{width: '36rem'}}>
                    <Card.Body>
                        <Card.Title><h2>{recipe.name}</h2></Card.Title>
                        <h5>Ingredients</h5>
                        <ul>
                            {recipe.ingredients.map((ingredient, i) => {
                                return (
                                    <li key={i}>{ingredient.amount} { ingredient.measurement} {ingredient.name}</li>
                                )
                            })}
                        </ul>
                        <h5>Instructions</h5>
                        <ul style={{ listStyle: "none" }}>
                            <li>
                                {recipe.instructions ? recipe.instructions : "No instructions provided..."}
                            </li>

                        </ul>
                        <Button variant='danger' onClick={() => navigate('/recipes')}>Go Back</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Error! No recipe selected!</h1>
            </div>
        )
    }
}

export default RecipeDisplay;