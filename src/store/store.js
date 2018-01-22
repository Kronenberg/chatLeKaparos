import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import firebase, { storage } from 'firebase';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import  { runTheApp } from '../actions/globalActions';
import  { fetchPosts } from '../actions/events' ;

var fbConfig = {
	apiKey: "AIzaSyAaq4JGtoUlAD7NkctraMGkmAJGOkqhsBo",
	authDomain: "voxer-chat.firebaseapp.com",
	databaseURL: "https://voxer-chat.firebaseio.com",
	projectId: "voxer-chat",
	storageBucket: "",
	messagingSenderId: "748382820140"
};

const config = {
	userProfile: 'users', // firebase root where user profiles are stored
	enableLogging: false, // enable/disable Firebase's database logging
}

const logger = createLogger();


firebase.initializeApp(fbConfig)
const initialState = {}


const store = createStore(
	rootReducer,
	initialState,
	compose(
	applyMiddleware(logger, thunk.withExtraArgument(getFirebase)), // Pass getFirebase function as extra argument
	reactReduxFirebase(firebase, config)
	)
);

// let store = createStore(
// 	rootReducer,
// 	applyMiddleware(logger, thunk)
// )


store.dispatch(runTheApp())
store.dispatch(fetchPosts())

export default store;