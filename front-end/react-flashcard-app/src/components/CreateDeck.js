import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const CreateDeck = () => {

    const [deckName, changeName] = useState('');
    const history = useHistory();

    const createDeck = () => {
        console.log(deckName);
        history.push('/decks');
    }

    const cancel = () => {
        history.push('/decks');
    }

    return(
        <div>
            <form onSubmit={createDeck}>
                <label>Deck Name: </label>
                <input
                    value={deckName}
                    onChange={(e) => changeName(e.target.value)}
                    required
                ></input>
                <button>Create</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default CreateDeck;