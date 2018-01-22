import {
    GET_ALL_GROUPS_PENDING,
    GET_ALL_GROUPS_REJECTED,
    GET_ALL_GROUPS_SUCCESS
} from '../ActionsTYPES/TYPES';

import { SAVE_POST, FETCH_POSTS } from '../ActionsTYPES/TYPES'

export const getAllGroups = () => 
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    dispatch({ type: GET_ALL_GROUPS_PENDING });
    
    const groups = firebase.database().ref('messages/');

    groups.once("value")
    .then((snapshot) => {
        dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: snapshot.val() });
    })
    .catch((error) => {
        dispatch({ type: GET_ALL_GROUPS_REJECTED, payload: error });
    })
    }



export const sendMessage = (post) => 
    (dispatch, getState, getFirebase) => {

        if (!localStorage.getItem('userName')) {
            return;
        }

        const m = {
            name: localStorage.getItem('userName'),
            message: post
        }
        const firebase = getFirebase()
        firebase.database().ref(`messages/`)
            .push(m)
            .then(() => {
                dispatch({ type: SAVE_POST, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_POST, payload: err })
            })
    }




export default {
    getAllGroups,
    sendMessage
}
