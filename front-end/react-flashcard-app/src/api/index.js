import axios from 'axios';

const url = 'http://localhost:3001/api/v1';

export const fetchDecks = (data) => axios.post(`${url}/unique-decks`, data);
// export const fetchDecks = (data) => axios.get(`${url}/unique-decks`, data);
export const createDeck = (data) => axios.post(`${url}/create-deck`, data);
export const updateDeck = (data) => axios.post(`${url}/update-deck`, data);
export const addCard = (data) => axios.post(`${url}/add-card`, data);
export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);
