import { SAVE_POST, GET_ALL_GROUPS_SUCCESS } from '../ActionsTYPES/TYPES'




export const fetchPosts = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref('messages/').limitToLast(50)

    posts.on('value', function (snapshot) {
        // notifyMe('New Message!');
        console.log(snapshot.val()['time']);
        dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: snapshot.val() });
    });
};