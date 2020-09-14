import { combineReducers } from 'redux'
import myFavorites from './myFavorites'
import animes from './animes'
import selectedAnime from './selectedAnime'
import user from './user'

export default combineReducers({
  myFavorites,
  animes,
  selectedAnime,
  user
})