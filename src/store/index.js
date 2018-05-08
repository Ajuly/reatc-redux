import { createStore } from '../redux';

import reducers from './reducers';

let store = createStore(reducers);
// 方便调试 
window.store = store;

export default store;