import { 
    GET_ALL_GROUPS_PENDING,
    GET_ALL_GROUPS_SUCCESS,
    GET_ALL_GROUPS_REJECTED
} from '../ActionsTYPES/TYPES';
import { messaging } from 'firebase';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    groups: [],
    error: null
}

function notifyMe(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(message);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(message);
        }
      });
    }
  }

function groupReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_GROUPS_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
        case GET_ALL_GROUPS_SUCCESS: {
            var list = [];
            if (!action.payload) {
                console.log('skip');
            } else {
                for (var key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        let message = action.payload[key].message ? action.payload[key].message : '';
                        let name = action.payload[key].name ? action.payload[key].name : '';
                        let accountColor = action.payload[key].accountColor ? action.payload[key].accountColor : '';
                        if (message.trim().length > 0) {
                            list.push({
                                message: message,
                                name: name,
                                accountColor: accountColor,
                                key: key
                            })
                        }
                    }
                }
                notifyMe(list[list.length - 1].message);
            }
          
            return {
                ...state,
                success: true,
                pending: false,
                rejected: false,
                groups: list
            }
        }
        case GET_ALL_GROUPS_REJECTED: {
            return {
                ...state,
                pending: false,
                error: action.payload,
                success: false,
                rejected: true
            }
        }

        default: {
            return state;
        }
       
    }


}

export default groupReducer;