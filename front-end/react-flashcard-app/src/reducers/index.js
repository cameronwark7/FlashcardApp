import { combineReducers } from "redux";

import cards from './cards';
import decks from './decks';
import auth from './auth';

export default combineReducers({ cards, decks, auth });
