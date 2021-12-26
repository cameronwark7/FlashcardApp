import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@chakra-ui/react';

const StudyDeck = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
            // console.log(x[0].cards);
        }
    }, [decks]);

    const showButtonClick = () => {
        setShowCard(true);
    }

    const againButtonClick = () => {

    }

    const goodButtonClick = () => {

    }

    return(
        <div>
            { selectedDeck && (
                <>
                <div>{JSON.stringify(selectedDeck)}</div>
                <div>{selectedDeck[0]?.front}</div>
                
                { showCard ? 
                <>
                    <div>{selectedDeck[0]?.back}</div>
                    <ButtonGroup>
                    <Button onClick={againButtonClick}>Again</Button>
                    <Button onClick={goodButtonClick}>Good</Button>
                    </ButtonGroup>
                </> 
                : <Button onClick={showButtonClick}>Show</Button>}
                </>
                ) }
        </div>
    )
}

export default StudyDeck;
