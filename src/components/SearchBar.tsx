import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <Form.Group style={{display: 'flex', justifyContent: 'center'}}>
            <InputGroup style={{width: '50%', paddingTop: '15px'}}>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
                <Form.Control
                    type='text'
                    placeholder='Search...'/>
            </InputGroup>
        </Form.Group>
    )
}

export default SearchBar;