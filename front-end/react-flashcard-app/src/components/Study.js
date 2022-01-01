import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CreateDeck from './CreateDeck';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select
  } from '@chakra-ui/react';


const Study = () => {

    const [deckName, setDeckName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const decks = useSelector((state) => state.decks);
    const history = useHistory();

    useEffect(() => {
        setDeckName(decks[0]?.name);
    }, [decks]);

    const study = () => {
        const x = decks.filter(obj => {
            return obj.name == deckName;
        });
        if (x[0].cards.length > 0) {
            history.push(`/study/${deckName}`)
        } else {
            setErrorMessage(`There are no cards in ${deckName}`);
            // alert(`There are no cards in deck ${deckName}`);
        }
    }

    return(
        <div>
            {decks &&  
                <FormControl>
                    <FormLabel htmlFor='deck'>Deck</FormLabel>
                    <Select 
                    id='deck'
                    onChange={(e) => setDeckName(e.target.value)}
                    >
                        {decks.map((val) => {
                            return <option value={val.name}>{val.name}</option>
                        })}
                    </Select>
                    { errorMessage && <div>{errorMessage}</div>}
                </FormControl>
            }
            <br/>
            <Button onClick={study}>Study</Button>
        </div>
    )
}

export default Study;
