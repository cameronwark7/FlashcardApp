import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDeck } from '../actions/decks';
import * as api from '../api/index.js';
import { Button } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react'

const CreateDeck = () => {

    const [deckName, setDeckName] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = localStorage.getItem('profile');

        const data = {
            deckName,
            email: JSON.parse(profile).result.email
        };

        dispatch(createDeck(data)).then(() => {
            window.location.reload();
        })
    }

    const cancel = () => {
        history.push('/decks');
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Text>Deck Name:</Text>
                <Input
                value={deckName.name}
                onChange={(e) => setDeckName(e.target.value)}
                required
                ></Input>
                <br/>

                <Button onClick={cancel}>Back</Button>
                <Button type='submit'>Create</Button>
            </form>
        </div>
    )
}

export default CreateDeck;
