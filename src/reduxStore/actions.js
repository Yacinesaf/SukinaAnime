import { getAnimes, getAnimeByName } from '../services/apiEndpoints'

export const setAnimes = (pageNum) => dispatch => {
  dispatch({ type: 'SET_FETCHING_ANIMES', payload: true })
  return getAnimes(pageNum).then(res => {
    dispatch({ type: 'SET_ANIMES', payload: res.data })
    dispatch({ type: 'SET_TOTAL_COUNT', payload: res.meta.count })
    dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
  })
}

export const setSelectedAnime = (anime) => dispatch => {
  dispatch({ type: 'SET_SELECTED_ANIME', payload: anime })
}
export const setSelectedAnimeByFetch = (name) => dispatch => {
  dispatch({ type: 'SET_FETCHING', payload: true })
  return getAnimeByName(name).then(res => {
    dispatch({ type: 'SET_SELECTED_ANIME', payload: res.data })
    dispatch({ type: 'SET_FETCHING', payload: false })
  })
}
