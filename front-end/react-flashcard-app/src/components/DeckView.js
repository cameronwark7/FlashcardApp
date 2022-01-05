import React from 'react';
import { useParams } from 'react-router-dom';
import { Center, Stack, HStack, VStack, StackDivider, Box, Button, ButtonGroup, Textarea, Text, Heading } from '@chakra-ui/react';
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
    const [frontErrorMessage, setFrontErrorMessage] = useState('');
    const [backErrorMessage, setBackErrorMessage] = useState('');

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
        const isValid = validate();
        if (isValid) {
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
    }

    const validate = () => {
        // copy the values of the current deck and remove the selected index
        const deckCopy = [...selectedDeck];
        deckCopy.splice(selectedIndex, 1);

        let validationState = true;

        // with the index removed check if there are any cards with the same front value as what the user entered.
        const duplicates = deckCopy.filter(c => c.front == front);
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
        <div>
            <Heading side='md' marginX={'10px'}>{deckName}</Heading>
            <HStack align={'top'}>
                <VStack
                divider={<StackDivider borderColor='gray.200' />}
                // border='1px' borderColor='gray.200' borderRadius='md'
                // shouldWrapChildren='true'
                wrap={'true'}
                spacing={0}
                w={'60%'}
                align='stretch'
                >
                    {/* <Box border='1px' borderColor='gray.200' borderRadius='md' divider={<StackDivider borderColor='gray.200' />}> */}
                    { selectedDeck && selectedDeck.map((card, index) => {
                            return <Box onClick={() => setForm(card, index)} className='card'>{card.front}</Box>
                    }) }
                    { selectedDeck.length == 0 && <Center>No cards in deck</Center> }
                    {/* </Box> */}
                </VStack>
                <Box
                w={'40%'}
                >
                    <Text>Front:</Text>
                    {frontErrorMessage ? 
                    <>
                    <Textarea
                    value={front}
                    placeholder='Front'
                    isInvalid
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>
                    <div>{frontErrorMessage}</div>
                    </> 
                    : 
                    <>
                    <Textarea
                    value={front}
                    placeholder='Front'
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>
                    </>}

                    <Text>Back:</Text>
                    {backErrorMessage ? 
                    <>
                    <Textarea
                    value={back}
                    isInvalid
                    placeholder='Back'
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                    <div>{backErrorMessage}</div>
                    </>
                    :
                    <>
                    <Textarea
                    value={back}
                    placeholder='Back'
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                    </>}
                    {frontErrorMessage ? <></> : <></>}
                    <ButtonGroup marginY={'8px'}>
                        {selectedIndex != null ? <Button onClick={saveCard}>Save Changes</Button> : <Button isDisabled>Save Changes</Button>}
                        {selectedIndex != null ? <Button onClick={deleteCard}>Delete Card</Button> : <Button isDisabled>Delete Card</Button>}
                    </ButtonGroup>
                </Box>
            </HStack>
        </div>
    )
}

export default DeckView;
