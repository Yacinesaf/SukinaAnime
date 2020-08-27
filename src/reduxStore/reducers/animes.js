const initialState = {
  animes: [],
  fetchingAnimes: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_ANIMES':
      return { ...state, animes: action.payload }
    case 'SET_FETCHING_ANIMES':
      return { ...state, fetchingAnimes: action.payload }

  }
}