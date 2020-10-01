import { getAnimes, getAnimeByName, getyRelatedAnimes, getSelectedAnimeCategory } from '../services/apiEndpoints'

export const setAnimes = (pageNum) => dispatch => {
  dispatch({ type: 'SET_FETCHING_ANIMES', payload: true })
  return getAnimes(pageNum).then(res => {
    dispatch({ type: 'SET_ANIMES', payload: res.data })
    dispatch({ type: 'SET_TOTAL_COUNT', payload: res.meta.count })
    dispatch({ type: 'SET_FETCHING_ANIMES', payload: false })
  })
}

export const setSelectedAnime = (anime) => dispatch => {
  const categories = anime.relationships.categories.data
  dispatch({ type: 'SET_CATEGORY_ID', payload: categories[Math.floor(Math.random() * categories.length)].id })
  dispatch({ type: 'SET_SELECTED_ANIME', payload: anime })
}

export const setCurrentPage = (page) => dispatch => {
  dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
}

export const setSelectedAnimeByFetch = (name) => dispatch => {
  dispatch({ type: 'SET_FETCHING', payload: true })
  return getAnimeByName(name).then(res => {
    const categories = res.data[0].relationships.categories.data
    dispatch({ type: 'SET_CATEGORY_ID', payload: categories[Math.floor(Math.random() * categories.length)].id })
    dispatch({ type: 'SET_SELECTED_ANIME', payload: res.data[0] })
    dispatch({ type: 'SET_FETCHING', payload: false })
  })
}

export const setUser = (user) => dispatch => {
  dispatch({ type: 'SET_ID', payload: user.uid })
  dispatch({ type: 'SET_EMAIL', payload: user.email })
}

export const setRelatedAnimes = (category) => dispatch => {
  dispatch({ type: 'SET_FETCHING', payload: true })
  return getSelectedAnimeCategory(category).then(resp => {
    return getyRelatedAnimes(resp).then(res => {
      dispatch({ type: 'SET_RELATED_ANIMES', payload: res.data.data })
      dispatch({ type: 'SET_FETCHING', payload: false })
    })
  })
}