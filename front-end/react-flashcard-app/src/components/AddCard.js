import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as api from '../api';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select
  } from '@chakra-ui/react';
import { Center, Stack, HStack, VStack, StackDivider, Box, Button, Textarea, Text } from '@chakra-ui/react';

const AddCard = () => {
    const [deckName, setDeckName] = useState('');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [deckNameError, setDeckNameError] = useState('');
    const [frontErrorMessage, setFrontErrorMessage] = useState('');
    const [backErrorMessage, setBackErrorMessage] = useState('');
    const profile = localStorage.getItem('profile');

    const decks = useSelector((state) => state.decks);
    
    useEffect(()=> {
        setDeckName(decks[0]?.name);
    }, [decks]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (isValid) {
            const obj = { 
                deckName, 
                front, 
                back,
                email: JSON.parse(profile).result.email
            };
    
            await api.addCard(obj);
            window.location.reload();
        }
    }

    const validate = () => {
        // reset error messages
        setFrontErrorMessage('');
        setBackErrorMessage('');
        setDeckNameError('');

        if (!deckName) {
            setDeckNameError('*Required');
            return false;
        }

        // get cards array of selected deck
        const currentDeck = decks.filter(d => d.name == deckName);
        const cards = currentDeck[0].cards;

        let validationState = true;

        // check if there are matching 'front' values in the cards array to what the user inputted
        const duplicates = cards.filter(c => c.front == front);
        if (duplicates.length > 0) {
            setFrontErrorMessage('Duplicate card.');
            validationState = false;
        }
        if (front.length == 0) {
            setFrontErrorMessage('*Required');
            validationState = false;
        }
        if (back.length == 0) {
            setBackErrorMessage('*Required');
            validationState = false;
        }
        if (front.length > 100) {
            setFrontErrorMessage('Front must be between 1 and 100 characters.');
            validationState = false;
        }
        if (back.length > 100) {
            setBackErrorMessage('Back must be between 1 and 100 characters.');
            validationState = false;
        }
        
        return validationState;
    }

    return(
        <Center marginTop='10px'>
            <Box width={'40%'}>
            <form onSubmit={handleSubmit}>
                {decks &&  
                    <FormControl>
                        <FormLabel htmlFor='deck'>Deck</FormLabel>
                        { deckNameError ? (
                        <>
                            <Select
                            id='deck'
                            isInvalid
                            onChange={(e) => setDeckName(e.target.value)}
                            >
                                {decks.map((val) => {
                                    return <option value={val.name}>{val.name}</option>
                                })}
                            </Select>
                            <div>{deckNameError}</div>
                        </>
                        ) : (
                            <Select
                            id='deck'
                            onChange={(e) => setDeckName(e.target.value)}
                            >
                                {decks.map((val) => {
                                    return <option value={val.name}>{val.name}</option>
                                })}
                            </Select>
                        )}
                    </FormControl>
                }
                <br/>

                <Text>Front:</Text>
                {frontErrorMessage ? 
                <>
                    <Textarea
                    isInvalid
                    placeholder='Front'
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>
                    <div>{frontErrorMessage}</div>
                </>
                :
                <>
                    <Textarea
                    placeholder='Front'
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>
                </>
                }
                <br/>

                <Text>Back:</Text>
                { backErrorMessage ?
                <>
                    <Textarea
                    isInvalid
                    placeholder='Back'
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                    <div>{backErrorMessage}</div>
                </>
                :
                <>
                    <Textarea
                    placeholder='Back'
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                </>
                }
                <br/>

                <Button type='submit' marginTop='10px'>Add Card</Button>
            </form>
            </Box>
        </Center>
    )
}

export default AddCard;
