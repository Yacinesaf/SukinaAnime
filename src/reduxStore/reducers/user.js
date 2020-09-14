const initialState = {
  email : null,
  id : null,
  fetchingUser : true
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_EMAIL':
      return { ...state, selectedAnime: action.payload }
    case 'SET_ID':
      return { ...state, relatedAnimes: action.payload }
    case 'SET_FETCHING_USER':
      return { ...state, fetching: action.payload }


  }
}