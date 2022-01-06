import React from 'react';
import { Text, Button, ButtonGroup, Input, Center, VStack, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as api from '../api/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RenameDeck = () => {

    const { deckName } = useParams();
    const [newDeckName, setNewDeckName] = useState(deckName);
    const [deckNameError, setDeckNameError] = useState('');
    const history = useHistory();
    const decks = useSelector((state) => state.decks);

    const cancel = () => {
        history.push('/decks');
    }

    const save = async () => {
        const profile = localStorage.getItem('profile');

        const isValid = validate();
        if (isValid) {
            const obj = {
                deckName,
                newDeckName,
                email: JSON.parse(profile).result.email
            }
    
            await api.updateDeckName(obj);
            history.push('/decks');
        }
    }

    const validate = () => {
        // check if current deck list contains a deck name with what the user entered, if so then set deckNameError for conditional rendering.
        const matchingDecks = decks.filter(d => d.name == newDeckName);
        if (matchingDecks.length > 0) {
            // if the matching decks array only contains one value, check if it matches the original value.
            if (matchingDecks[0].name == deckName && matchingDecks.length == 1) {
                return true;
            } else {
                setDeckNameError('A deck with that name already exists.');
                return false;
            }
        }

        // range validation
        if (newDeckName.length == 0) {
            setDeckNameError('*Required');
            return false;
        }
        if (newDeckName.length > 100) {
            setDeckNameError('Deck name must be between 1 and 100 characters.');
            return false;
        }

        return true;
    }

    return(
        <Center marginX='10px' width='100%'  marginY='10px'>
            <VStack>
                <Text>Deck Name</Text>
            { deckNameError ? 
            <>
                <Input
                defaultValue={deckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                isInvalid
                errorBorderColor='crimson'
                ></Input>
                <div>{deckNameError}</div>
            </>
            : 
            <>
                <Input
                defaultValue={deckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                ></Input>
            </> 
            }
            <ButtonGroup marginX='10px'>
                <Button onClick={save}>Save</Button>
                <Button onClick={cancel}>Cancel</Button>
            </ButtonGroup>
            </VStack>
        </Center>
    )
}

export default RenameDeck;
