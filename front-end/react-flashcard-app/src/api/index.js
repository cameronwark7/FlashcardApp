import axios from 'axios';

const url = 'http://localhost:3001/api/v1';

export const fetchDecks = () => axios.get(`${url}/unique-decks`);
