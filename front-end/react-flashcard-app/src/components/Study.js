import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';


const Study = () => {

    const [deckName, setDeckName] = useState('');
    const decks = useSelector((state) => state.decks);

    useEffect(() => {
        setDeckName(decks[0]?.name);
    }, [decks]);

    const study = () => {
        console.log(deckName);
    }

    return(
        <div>
            <label>Deck: </label>
            {decks && 
                    <select
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    >
                    {decks.map((val) => {
                        return <option value={val.name}>{val.name}</option>
                    })}
                    </select>   
                }
            <br/>
            <Button onClick={study}>Study</Button>
        </div>
    )
}

export default Study;
