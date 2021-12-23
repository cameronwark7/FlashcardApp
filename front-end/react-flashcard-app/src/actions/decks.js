import * as api from '../api';

// using thunk to handle asynchronous logic
export const getDecks = (obj) => async (dispatch) => {
    try 
    {
        console.log(obj.email);
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
        // console.log(data.decks)

        dispatch({ type: 'CREATE_DECK', payload: JSON.stringify(data.decks) });
        // dispatch({ type: 'CREATE_DECK', payload: {key: "value"} });
    }
    catch (error)
    {
        console.log(error.message);
    }
}
