import axios from 'axios';

const url = 'http://localhost:3001/api/v1';

export const fetchDecks = () => axios.get(`${url}/unique-decks`);
export const createDeck = (newDeck) => axios.post(`${url}/create-deck`, newDeck);
