import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
                <Card.Title className="book-details">
                    {name}
                </Card.Title>
                <div className='book-details'>
                    <div>Name: {name}</div>
                    <div>Ingredients: {ingredients.length}</div>
                </div>
                <Button variant='primary' onClick={() => {navigate(`/edit/${id}`)}}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleRemoveRecipe(id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Recipe;