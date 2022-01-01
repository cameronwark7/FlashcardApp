import * as api from '../api';

// gets list of unique decks and puts in redux store
export const getDecks = (obj) => async (dispatch) => {
    try 
    {
        const { data } = await api.fetchDecks(obj);
        
        // redux-thunk requires 'dispatch(action)' instead of 'return action'
        dispatch({ type: 'FETCH_ALL_DECKS', payload: data });
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

export const createDeck = (obj) => async (dispatch) => {
    try
    {
        const { data } = await api.createDeck(obj);
        dispatch({ type: 'CREATE_DECK', payload: JSON.stringify(data.decks) });
    }
    catch (error)
    {
        console.log(error.message);
    }
}
