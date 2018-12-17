import { createStore } from 'redux'
import rootReducer from '../reducers/index'
import C from '../constants/action-types';

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState)
  return store
} 

var store = configureStore();

export function UID(){
  store.dispatch({
    type: C.NEW_UID
  });
  const state = store.getState();
  return state.max_uid.max_uid;
}

export default store;
