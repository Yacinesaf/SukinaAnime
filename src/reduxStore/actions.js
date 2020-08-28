import { getAnimes, getNextPageAnimes, getPrevPageAnimes, getSpeceficPageAnimes } from '../services/apiEndpoints'

export const setAnimes = (pageNum, action) => dispatch => {
  dispatch({ type: 'SET_FETCHING_ANIMES', payload: true })
  if (pageNum) {
    return getSpeceficPageAnimes(pageNum, action).then(res => {
      dispatch({ type: 'SET_ANIMES', payload: res.data })
      dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
    })
  }
  if (action === 'next') {
    return getNextPageAnimes().then(res => {
      dispatch({ type: 'SET_ANIMES', payload: res.data })
      dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
    })
  } else if (action === 'prev') {
    return getPrevPageAnimes().then(res => {
      dispatch({ type: 'SET_ANIMES', payload: res.data })
      dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
    })
  }
  return getAnimes().then(res => {
    dispatch({ type: 'SET_ANIMES', payload: res.data })
    dispatch({ type: 'SET_TOTAL_COUNT', payload: res.links.last })
    dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
  })
}
