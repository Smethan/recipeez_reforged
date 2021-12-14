import React, { useState, useContext } from "react";
import { Form, Button, InputGroup, Row, Col, Dropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from "../type";
import MeasurementMenu from './MeasurementMenu';
import UserContext from "../context/UserContext";
import { identity } from "lodash";

const RecipeForm = (props: any) => {
    const [recipe, setRecipe] = useState(() => {
        return ({
            id: props.recipe ? props.recipe.id : '',
            name: props.recipe ? props.recipe.name : '',
            ingredients: props.recipe ? props.recipe.ingredients : [{}],
            author_id: props.recipe ? props.recipe.author_id : '',
        })
    })

    const measurements = ['C', 'g', 'L', 'tsp', 'Tbsp', 'mL', 'oz']

    const [errorMsg, setErrorMsg] = useState('');
    const { name, ingredients } = recipe;
    const {user_id} = useContext(UserContext)

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
            if (recipe.id == '') {
                const submitRecipe = {
                    author_id: user_id,
                    name,
                    ingredients
                }
                props.handleOnSubmit(submitRecipe)
            } else {
                const submitRecipe = {
                    id: recipe.id,
                    author_id: user_id,
                    name,
                    ingredients
                }
                props.handleOnSubmit(submitRecipe)
            }
        } else {
            errorMsg = 'Please fill out all fields'
        }
        setErrorMsg(errorMsg);
    }

    const handleMeasurementChange = (value: string,index: number) => {
        setRecipe((PrevState) => {
            const newIng = PrevState.ingredients;
            console.log(index)
            newIng[index].measurement = value;
            
            return ({
                ...PrevState,
                ingredients: newIng
            })
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        
        // const target = event.target as typeof event.target & {
        //     name: { value: string },
        //     value: {value: string}
        // }
        const { name, value } = event.target;
        
        switch (name.includes(',')) {
            case true:
                const op = name.split(',');
                switch (op[1]) {
                    case 'name':
                        setRecipe((PrevState) => {
                            const newIng = PrevState.ingredients;
                            newIng[index ? index : 0].name = value;
                            
                            return ({
                                ...PrevState,
                                [op[0]]: newIng
                            })
                        });
                        break;
                    case 'amount':
                        setRecipe((PrevState) => {
                            const newIng = PrevState.ingredients;
                            newIng[index ? index : 0].amount = value;
                            
                            return ({
                                ...PrevState,
                                [op[0]]: newIng
                            })
                        });
                        break;
                    default:
                        console.log(`Error! Somehow there was a comma in the string but nothing after the comma... I recieved ${name[1]}`)
                }
                
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
                <h5 style={{marginTop: '10px'}}>Ingredients</h5>
                <ul style={{listStyle: 'none'}}>
                    {ingredients.map((ingredient: any, i: any) => {
                        const testIndex = i;
                        return (

                            <li>
                                <Form.Group controlId='ingredients' style={{marginTop: '10px'}}>
                                    <InputGroup>
        
                                        
                                        <Form.Control
                                            style={{padding: '10px'}}
                                            type="text"
                                            name="ingredients,name"
                                            value={ingredient.name}
                                            className='w-25'
                                            placeholder="Enter Name of ingredient"
                                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleInputChange(evt, i)} />
                                        
                                        <Form.Control
                                            style={{padding: '10px'}}
                                            type="number"
                                            name="ingredients,amount"
                                            value={ingredient.amount}
                                            placeholder="Enter amount"
                                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleInputChange(evt, i)} />
                                        
                                        <Dropdown>
                                            <Dropdown.Toggle style={{width: '12%', marginRight: '0'}}>
                                                {ingredient.measurement ? ingredient.measurement : 'Select...'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu as={MeasurementMenu}>
                                                {measurements.map((measurement, i) => {
                                                    return (
                                                        <Dropdown.Item key={ i} onClick={() => {handleMeasurementChange(measurement, testIndex)}}>{measurement}</Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        
                                            {/* <Form.Control
                                            style={{padding: '10px'}}
                                            type="text"
                                            name="ingredients,measurement"
                                            value={ingredient.measurement}
                                            placeholder="Enter measurement"
                                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleInputChange(evt, i)} /> */}
                                        
                                        <Button variant="danger" onClick={() => handleRemoveIngredient(i)}>-</Button>
                                    </InputGroup>
                                    
                                </Form.Group>
                            </li>
                        )
                    })}
                    <li><Button variant="primary" onClick={() => { setRecipe((PrevState) => ({ ...PrevState, ingredients: [...PrevState.ingredients, {}]}))}} className='submit-btn'>Add Ingredient</Button></li>
                </ul>
                    {/* <Form.Label>Ingredient Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="ingredients"
                        value={ingredients}
                        placeholder="Enter Name of ingredient"
                        onChange={handleInputChange}/> */}
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    
                    <Button variant="primary" type="submit" className="submit-btn">Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default RecipeForm;