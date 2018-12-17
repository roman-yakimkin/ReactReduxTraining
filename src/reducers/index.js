import { combineReducers } from 'redux'
import bands from './bands'
import albums from './albums'
import max_uid from './uid'

export default combineReducers({
  bands,
  albums,
  max_uid
})