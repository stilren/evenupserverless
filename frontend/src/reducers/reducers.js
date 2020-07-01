import { combineReducers } from 'redux';

// Reducers
import eventReducer from './event-reducer';
import navbarReducer from './navbar-reducer';

// Combine Reducers
var reducers = combineReducers({
    eventState: eventReducer,
    navbarState: navbarReducer
});

export default reducers;
