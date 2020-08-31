import { getAnimes } from '../services/apiEndpoints'

export const setAnimes = (pageNum) => dispatch => {
  dispatch({ type: 'SET_FETCHING_ANIMES', payload: true })
  return getAnimes(pageNum).then(res => {
    dispatch({ type: 'SET_ANIMES', payload: res.data })
    dispatch({ type: 'SET_TOTAL_COUNT', payload: res.links.last })
    dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
  })
}
