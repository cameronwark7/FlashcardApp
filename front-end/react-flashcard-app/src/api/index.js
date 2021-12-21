import axios from 'axios';

const url = 'http://localhost:3001/api/v1';

export const fetchDecks = () => axios.get(`${url}/unique-decks`);
export const createDeck = (newDeck) => axios.post(`${url}/create-deck`, newDeck);
export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);
