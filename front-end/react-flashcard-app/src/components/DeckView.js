import React from 'react';
import { useParams } from 'react-router-dom';

const DeckView = () => {

    const { deckName } = useParams();

    return(
        <div>
            <p>{deckName}</p>
        </div>
    )
}

export default DeckView;
