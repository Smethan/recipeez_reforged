import { url } from 'inspector';
import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ThreeDotButton from './ThreeDotButton';

const Recipe = ({
    id,
    name,
    ingredients,
    image,
    handleRemoveRecipe
}: any) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem', height: '12rem' }} className='book'>
            <Card.Img variant="top" src={image} style={{ height: '12rem', objectFit: 'cover', cursor: 'pointer' }} onClick={() => navigate(`/recipe/${id}`)} />
            <Card.Body style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '0 0 0.25rem 0.25rem' }}>
                <Card.Title className="book-title">
                    <div onClick={() => navigate(`/recipe/${id}`)} style={{ cursor: 'pointer', textOverflow: 'ellipsis' }}>{name}</div>
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
            </Card.Body>
        </Card>
    )
}

export default Recipe;