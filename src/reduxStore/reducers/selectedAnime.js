const initialState = {
  selectedAnime: null,
  fetching: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state

    case 'SET_SELECTED_ANIME':
      return { ...state, selectedAnime: action.payload[0] }
    case 'SET_FETCHING':
      return { ...state, fetching: action.payload }


  }
}