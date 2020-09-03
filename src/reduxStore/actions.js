import { getAnimes, getAnimeByName, getyRelatedAnimes } from '../services/apiEndpoints'

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

export const setCurrentPage = (page) => dispatch => {
  dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
}

export const setSelectedAnimeByFetch = (name) => dispatch => {
  dispatch({ type: 'SET_FETCHING', payload: true })
  return getAnimeByName(name).then(res => {
    dispatch({ type: 'SET_SELECTED_ANIME', payload: res.data[0] })
    dispatch({ type: 'SET_FETCHING', payload: false })
  })
}

// export const setRelatedAnimes = (link) => dispatch => {
//   dispatch({ type: 'SET_FETCHING', payload: true })
//   return getyRelatedAnimes(link).then(res => {
//     dispatch({ type: 'SET_RELATED_ANIMES', payload: res.data })
//     dispatch({ type: 'SET_FETCHING', payload: false })
//   })
// }