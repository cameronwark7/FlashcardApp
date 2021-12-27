import React from 'react';

const DeckListBox = (props) => {
    console.log(props.deck.name);
    return(
        <div>{props.deck.name}</div>
    )
}

export default DeckListBox;
