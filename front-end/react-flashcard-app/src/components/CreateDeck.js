import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createDeck } from '../actions/decks';
import * as api from '../api/index.js';
import { Button } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';

const CreateDeck = () => {

    const [deckName, setDeckName] = useState('');
    const [deckNameError, setDeckNameError] = useState('');
    const decks = useSelector((state) => state.decks);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (isValid) {
            const profile = localStorage.getItem('profile');
            const data = {
                deckName,
                email: JSON.parse(profile).result.email
            };

            dispatch(createDeck(data)).then(() => {
                // window.location.reload();
                history.push('/decks');
            });
        }
    }

    const cancel = () => {
        history.push('/decks');
    }

    const validate = () => {
        const matchingDecks = decks.filter(d => d.name == deckName);

        // check if there is already a deck with the name in the input field.
        if (matchingDecks.length > 0) {
            setDeckNameError('A deck with that name already exists.');
            return false;
        }

        // range validation
        if (deckName.length == 0) {
            setDeckNameError('*Required');
            return false;
        }
        if (deckName.length > 100) {
            setDeckNameError('Deck name must be between 1 and 100 characters.');
            return false;
        }

        return true;
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Text>Deck Name:</Text>
                { deckNameError ? 
                <>
                    <Input
                    value={deckName.name}
                    onChange={(e) => setDeckName(e.target.value)}
                    isInvalid
                    errorBorderColor='crimson'
                    ></Input>
                    <div>{deckNameError}</div>
                </> 
                : 
                <>
                    <Input
                    value={deckName.name}
                    onChange={(e) => setDeckName(e.target.value)}
                    ></Input>
                </>
                }

                <Button onClick={cancel}>Back</Button>
                <Button type='submit'>Create</Button>
            </form>
        </div>
    )
}

export default CreateDeck;
