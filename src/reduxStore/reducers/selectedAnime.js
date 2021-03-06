const initialState = {
  selectedAnime: null,
  fetching: true,
  categoryId: null,
  relatedAnimes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_SELECTED_ANIME':
      return { ...state, selectedAnime: action.payload }
    case 'SET_CATEGORY_ID':
      return { ...state, categoryId: action.payload }
    case 'SET_RELATED_ANIMES':
      return { ...state, relatedAnimes: action.payload }
    case 'SET_FETCHING':
      return { ...state, fetching: action.payload }
    case 'UPDATE_ANIME_FAVORITE':
      let copy = { ...state.selectedAnime, isFavorite: action.payload.isFavorite }
      if (action.payload.docId) copy.docId = action.payload.docId
      return { ...state, selectedAnime: copy }
  }
}