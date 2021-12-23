import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDeck } from '../actions/decks';
import * as api from '../api/index.js'

const CreateDeck = () => {

    const [deckName, setDeckName] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = localStorage.getItem('profile');

        const data = {
            deckName,
            email: JSON.parse(profile).result.email
        };

        dispatch(createDeck(data));
        history.push('/decks'); // change to only redirect on 200 status eventually
    }

    const cancel = () => {
        history.push('/decks');
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Deck Name: </label>
                <input
                    value={deckName.name}
                    onChange={(e) => setDeckName(e.target.value)}
                    required
                ></input>
                <button>Create</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default CreateDeck;
