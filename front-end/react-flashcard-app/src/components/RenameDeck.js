import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as api from '../api/index';
import { useState } from 'react';

const RenameDeck = () => {

    const { deckName } = useParams();
    const [newDeckName, setNewDeckName] = useState(deckName);
    const history = useHistory();

    const cancel = () => {
        history.push('/decks');
    }

    const save = async () => {
        const profile = localStorage.getItem('profile');

        const obj = {
            deckName,
            newDeckName,
            email: JSON.parse(profile).result.email
        }

        await api.updateDeckName(obj);
        history.push('/decks');
    }

    return(
        <>
        <Input
        defaultValue={deckName}
        onChange={(e) => setNewDeckName(e.target.value)}
        required
        ></Input>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={save}>Save</Button>
        </>
    )
}

export default RenameDeck;
