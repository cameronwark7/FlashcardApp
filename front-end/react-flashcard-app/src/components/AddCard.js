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
    const profile = localStorage.getItem('profile');

    const decks = useSelector((state) => state.decks);
    
    useEffect(()=> {
        setDeckName(decks[0]?.name);
    }, [decks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = { 
            deckName, 
            front, 
            back,
            email: JSON.parse(profile).result.email
        };

        await api.addCard(obj);
        window.location.reload();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {decks &&  
                    <FormControl>
                        <FormLabel htmlFor='deck'>Deck</FormLabel>
                        <Select
                        id='deck'
                        onChange={(e) => setDeckName(e.target.value)}
                        >
                            {decks.map((val) => {
                                return <option value={val.name}>{val.name}</option>
                            })}
                        </Select>
                    </FormControl>
                }
                <br/>

                <Text>Front:</Text>
                <Textarea
                required
                placeholder='Front'
                value={front}
                onChange={(e) => setFront(e.target.value)}
                ></Textarea>
                <br/>

                <Text>Back:</Text>
                <Textarea
                required
                placeholder='Back'
                value={back}
                onChange={(e) => setBack(e.target.value)}
                ></Textarea>
                <br/>

                <Button type='submit'>Add Card</Button>
            </form>
        </div>
    )
}

export default AddCard;
