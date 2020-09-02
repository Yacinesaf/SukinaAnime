import { combineReducers } from 'redux'
import myFavorites from './myFavorites'
import animes from './animes'
import selectedAnime from './selectedAnime'


export default combineReducers({
  myFavorites,
  animes,
  selectedAnime
})