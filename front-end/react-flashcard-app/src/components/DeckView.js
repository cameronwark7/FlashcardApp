import React from 'react';
import { useParams } from 'react-router-dom';
import { Center, Stack, HStack, VStack, StackDivider, Box, Button, Textarea, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as api from '../api/index';

const DeckView = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
        }
    }, [decks]);

    const setForm = (card, index) => {
        setSelectedIndex(index);
        setFront(card.front);
        setBack(card.back);
    }

    const deleteCard = async () => {
        // get the selected card using the currently selected index and send to backend.
        const card = selectedDeck[selectedIndex];
        
        const profile = localStorage.getItem('profile');
        const obj = {
            card,
            deckName,
            email: JSON.parse(profile).result.email,
        }

        await api.deleteCard(obj);
        window.location.reload();
    }

    const saveCard = async () => {
        // copy the array without the reference
        let selectedDeckClone = [...selectedDeck];

        // update the cloned deck
        const newValues = { front, back }
        selectedDeckClone[selectedIndex] = newValues;

        // get all necessary values to update deck
        const profile = localStorage.getItem('profile');
        const obj = {
            deckName,
            newCards: selectedDeckClone,
            email: JSON.parse(profile).result.email
        }

        // send updated deck to backend
        await api.updateDeck(obj);
        window.location.reload();
    }

    return(
        <div>
            <Heading side='md'>{deckName}</Heading>
            <HStack>
                <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={3}
                w={'60%'}
                align='stretch'
                >
                    { selectedDeck && selectedDeck.map((card, index) => {
                            return <div onClick={() => setForm(card, index)}>{card.front}</div>
                    }) }
                    { selectedDeck.length == 0 && <Center>No cards in deck</Center> }
                </VStack>
                <Box
                w={'40%'}
                >
                    <Text>Front:</Text>
                    <Textarea
                    value={front}
                    placeholder='Front'
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>

                    <Text>Back:</Text>
                    <Textarea
                    value={back}
                    placeholder='Back'
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                    {selectedIndex != null ? <Button onClick={saveCard}>Save Changes</Button> : <Button isDisabled>Save Changes</Button>}
                    {selectedIndex != null ? <Button onClick={deleteCard}>Delete Card</Button> : <Button isDisabled>Delete Card</Button>}
                </Box>
            </HStack>
        </div>
    )
}

export default DeckView;
