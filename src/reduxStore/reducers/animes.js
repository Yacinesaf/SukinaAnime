const initialState = {
  animes: [],
  totalCount: null,
  fetchingAnimes: true,
  currentPage : null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_ANIMES':
      return { ...state, animes: action.payload }
    case 'SET_TOTAL_COUNT':
      return { ...state, totalCount: action.payload }
    case 'SET_FETCHING_ANIMES':
      return { ...state, fetchingAnimes: action.payload }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }

  }
}