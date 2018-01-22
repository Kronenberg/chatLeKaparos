import { SAVE_POST, GET_ALL_GROUPS_SUCCESS } from '../ActionsTYPES/TYPES'




export const fetchPosts = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref('messages/')

    posts.on('value', function (snapshot) {
        // notifyMe('New Message!');
        dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: snapshot.val() });
    });
};