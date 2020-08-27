import { combineReducers } from 'redux'
import myFavorites from './myFavorites'
import animes from './animes'


export default combineReducers({
  myFavorites,
  animes
})