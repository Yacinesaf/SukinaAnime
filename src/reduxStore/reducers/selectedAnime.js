const initialState = {
  selectedAnime: null,
  fetching: true,
  genre: null,
  relatedAnimes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_SELECTED_ANIME':
      return { ...state, selectedAnime: action.payload }
    case 'SET_GENRE':
      return { ...state, genre: action.payload }
    case 'SET_RELATED_ANIMES':
      return { ...state, relatedAnimes: action.payload }
    case 'SET_FETCHING':
      return { ...state, fetching: action.payload }


  }
}