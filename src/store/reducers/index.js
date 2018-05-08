// import { combineReducers } from '../../redux';
import { combineReducers } from 'redux';
import counter from './counter';
import counter2 from './counter2';

export default combineReducers({
    counter,
    counter2
})