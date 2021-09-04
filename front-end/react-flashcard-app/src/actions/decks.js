import * as api from '../api';

// using thunk to handle asynchronous logic
export const getDecks = () => async (dispatch) => {
    try 
    {
        const { data } = await api.fetchDecks();
        // redux-thunk requires 'dispatch(action)' instead of 'return action'
        dispatch({ type: 'FETCH_ALL_DECKS', payload: data });
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

export const createDeck = (post) => async (dispatch) => {
    try
    {
        const { data } = await api.createDeck(post);

        dispatch({ type: 'CREATE_DECK', payload: data });
    }
    catch (error)
    {
        console.log(error.message);
    }
}