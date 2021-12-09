import React, { useState } from "react";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const RecipeForm = (props: any) => {
    const [recipe, setRecipe] = useState(() => {
        return ({
            name: props.recipe ? props.recipe.name : '',
            ingredients: props.recipe ? props.recipe.ingredients : [''],
            author_id: props.recipe ? props.recipe.author_id : '',
        })
    })

    const [errorMsg, setErrorMsg] = useState('');
    const { name, ingredients } = recipe;

    const handleRemoveIngredient = (index: number) => {
        setRecipe((PrevState) => {
            const newIng = PrevState.ingredients
            newIng.splice(index, 1);
            return (
                {
                    ...PrevState,
                    ingredients: newIng
                }
            )
        })
    }

    const handleOnSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const values = [name, ingredients]
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled) {
            const recipe = {
                id: uuidv4(),
                author_id: uuidv4(),
                name,
                ingredients
            }
            props.handleOnSubmit(recipe)
        } else {
            errorMsg = 'Please fill out all fields'
        }
        setErrorMsg(errorMsg);
    }



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        
        // const target = event.target as typeof event.target & {
        //     name: { value: string },
        //     value: {value: string}
        // }
        const { name, value } = event.target;
        switch (name) {
            case 'ingredients':

                setRecipe((PrevState) => {
                    const newIng = PrevState.ingredients;
                    newIng[index ? index : 0] = value
                    
                    return ({
                        ...PrevState,
                        [name]: newIng
                    })
                });
                break;
        
            default:
                setRecipe((PrevState) => ({
                    ...PrevState,
                    [name]: value
                }));
                break;
        }
    }

    return (
        <div className='main-form'>
            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label 
                        style={{marginTop: '10px'}}>Recipe Name</Form.Label>
                    <Form.Control
                        style={{padding: '10px'}}
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter Name of recipe"
                        onChange={handleInputChange}/>
                </Form.Group>
                
                {ingredients.map((ingredient: any, i: any) => {
                    return(
                        <Form.Group controlId='ingredients'>
                            <Form.Label style={{marginTop: '10px'}}>Ingredient {i} Name</Form.Label>
                            <InputGroup>
                                <Form.Control
                                style={{padding: '10px'}}
                                type="text"
                                name="ingredients"
                                value={ingredient}
                                placeholder="Enter Name of ingredient"
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleInputChange(evt, i)} />
                                <Button variant="danger" onClick={() => handleRemoveIngredient(i)}>-</Button>
                            </InputGroup>
                            
                        </Form.Group>
                    )
                    })}
                    {/* <Form.Label>Ingredient Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="ingredients"
                        value={ingredients}
                        placeholder="Enter Name of ingredient"
                        onChange={handleInputChange}/> */}
                <Button variant="primary" onClick={() => {setRecipe((PrevState) => ({...PrevState, ingredients: [...PrevState.ingredients, '']}))}} className='submit-btn'>Add Ingredient</Button>
                <Button variant="primary" type="submit" className="submit-btn">Submit</Button>
            </Form>
        </div>
    )
}

export default RecipeForm;