import { getAnimes } from '../services/apiEndpoints'

export const setAnimes = () => dispatch => {
  dispatch({ type: 'SET_FETCHING_ANIMES', payload: true })
  return getAnimes().then(res => {
    dispatch({ type: 'SET_ANIMES', payload: res })
    dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
  })
}