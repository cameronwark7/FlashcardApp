import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@chakra-ui/react';

const StudyDeck = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);
    const [selectedDeckRandom, setSelectedDeckRandom] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [deckArrayIndex, setDeckArrayIndex] = useState(0);

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
            setRandomizedDeck(x[0].cards);
            // console.log(x[0].cards);
        }
    }, [decks]);

    const setRandomizedDeck = (array) => {
        // randomize 'selectedDeck' and set it to 'selectedDeckRandom'
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        // set useState variable
        setSelectedDeckRandom(array);
    }

    const showButtonClick = () => {
        setShowCard(true);
    }

    const againButtonClick = () => {
        setShowCard(false);

        // Generate a new index that is not the same as the previous index
        let randomIndex = null;
        do {
            randomIndex = Math.floor(Math.random() * selectedDeckRandom.length);
        } while (randomIndex == deckArrayIndex);
        setDeckArrayIndex(randomIndex);
    }

    const goodButtonClick = () => {
        setShowCard(false);

        // make a new array and delete the current index
        let arr = selectedDeckRandom.slice();
        arr.splice(deckArrayIndex, 1);

        // get the max index of the array, and randomly choose an integer between 0 and that index.
        const randomIndex = Math.floor(Math.random() * arr.length);
        setDeckArrayIndex(randomIndex);

        setSelectedDeckRandom(arr);

        // if (index > -1) {
        //     array.splice(index, 1);
        // }

    }

    const rebuildDeck = () => {
        setSelectedDeckRandom(selectedDeck);
        console.log(selectedDeck)
    }

    return(
        <div>
            { selectedDeckRandom && (
                <>
                <div>{JSON.stringify(selectedDeckRandom)}</div>

                {selectedDeckRandom.length > 0 ? (
                <>
                
                    <div>{selectedDeckRandom[deckArrayIndex]?.front}</div>

                    { showCard ? 
                    <>
                        <div>{selectedDeckRandom[deckArrayIndex]?.back}</div>
                        <ButtonGroup>
                        <Button onClick={againButtonClick}>Again</Button>
                        <Button onClick={goodButtonClick}>Good</Button>
                        </ButtonGroup>
                    </> 
                    : 
                    <Button onClick={showButtonClick}>Show</Button> }
                    
                </>) 
                : 
                <>
                    <div>Deck complete!</div><Button onClick={rebuildDeck}>Rebuild Deck</Button>
                </>}

            </>
             ) }
        </div>
    )
}

export default StudyDeck;
