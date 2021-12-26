import { useState } from "react";
import { Button } from '@chakra-ui/react';

const Study = () => {

    const [deck, setDeck] = useState('default');

    const study = () => {
        // fetch('http://localhost:3001/api/v1/get-cards')
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    return(
        <div>
            <label>Deck: </label>
            <select
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
            >
                <option value="default">Default</option>
            </select>
            <br/>
            <Button onClick={study}>Study</Button>
        </div>
    )
}

export default Study;