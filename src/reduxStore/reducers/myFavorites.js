const initialState = {
  favorites: [],
  fetchingFavorites: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload }
    case 'SET_FETCHING_FAVORITES':
      return { ...state, fetchingFavorites: action.payload }
  }
}