import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'

// @REDUCERS
import testReducer from './testReducer';
import groupReducer from './groupReducer';
import postsReducer from './postsReducer';
import authReducer from './authReducer';
import whoIsTypignReducer from './typingReducer.js';

// @ROOT REDUCER
const rootRecuer =  combineReducers({
  firebase: firebaseReducer,
  testReducer: testReducer,
  groupReducer: groupReducer,
  postsReducer: postsReducer,
  authReducer: authReducer,
  whoIsTypignReducer: whoIsTypignReducer
});

export default rootRecuer;