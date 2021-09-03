import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDeck } from '../actions/decks';

const CreateDeck = () => {

    const [postData, setPostData] = useState({ name: '' });
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(postData);

        dispatch(createDeck(postData));

        // fetch('http://localhost:3001/api/v1/create-deck', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify(deckObj)
        // }).then((res) => {
        //     console.log(res);
        // }).catch((error) => {
        //     console.log(error);
        // });

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
                    value={postData.name}
                    onChange={(e) => setPostData({name: e.target.value })}
                    required
                ></input>
                <button>Create</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default CreateDeck;
