import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ThreeDotButton from './ThreeDotButton';

const Recipe = ({
    id,
    name,
    ingredients,
    handleRemoveRecipe
}: any) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem' }} className='book'>
            <Card.Body>
                <Card.Title className="book-title">
                    <div onClick={() => navigate(`/recipe/${id}`)} style={{cursor: 'pointer'}}>{name}</div>
                    <Dropdown align='end'>
                        <Dropdown.Toggle as={ThreeDotButton}>
                        <Dropdown.Menu>
                            <Dropdown.Header>Options</Dropdown.Header>
                            <Dropdown.Item as='button' onClick={() => { navigate(`/edit/${id}`) }}>Edit</Dropdown.Item>
                            <Dropdown.Item as='button' onClick={() => handleRemoveRecipe(id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                </Card.Title>
                <div className='book-details'>
                    <div>Name: {name}</div>
                    <div>Ingredients: {ingredients.length}</div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Recipe;