import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as api from '../api';
import { Button } from '@chakra-ui/react';

const AddCard = () => {

    const [deckName, setDeckName] = useState('');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const profile = localStorage.getItem('profile');

    const decks = useSelector((state) => state.decks);
    
    useEffect(()=> {
        setDeckName(decks[0]?.name);
    }, [decks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = { 
            deckName, 
            front, 
            back,
            email: JSON.parse(profile).result.email
        };

        api.addCard(obj);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Deck: </label>
                {decks && 
                    <select
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    >
                    {/* <option value="default">Default</option>
                    <option value="deck 2">Deck 2</option> */}
                    {decks.map((val) => {
                        return <option value={val.name}>{val.name}</option>
                    })}
                    </select>   
                }
                <br/>

                <label>Front: </label>
                <br/>
                <textarea
                    required
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                ></textarea>
                <br/>

                <label>Back: </label>
                <br/>
                <textarea
                    required
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                ></textarea>
                <br/>

                <Button type='submit'>Add Card</Button>
            </form>
        </div>
    )
}

export default AddCard;
