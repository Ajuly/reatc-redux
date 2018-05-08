import {createStore} from '../redux/index';
import reducers from './reducers/index';

let store = createStore(reducers);
window.store = store;

export default store;