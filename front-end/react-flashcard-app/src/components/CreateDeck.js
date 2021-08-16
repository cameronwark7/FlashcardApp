import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const CreateDeck = () => {

    const [deckName, changeName] = useState('');
    const history = useHistory();

    const createDeck = () => {
        const deckObj = {
            name: deckName
        }

        fetch('http://localhost:3001/api/v1/create-deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(deckObj)
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });

        history.push('/decks'); // change to only redirect on 200 status eventually

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