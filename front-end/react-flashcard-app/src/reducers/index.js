import { combineReducers } from "redux";

import decks from './decks';
import auth from './auth';

export default combineReducers({ decks, auth });
