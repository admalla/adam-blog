const initialState = {
  valueArt: '',
  selected: {},
  flag: true,
  searchValue: '',
  isPostEdit: false,
  sendPostEdited: false,
};

export function reducerArticle(state = initialState, action) {
  switch (action.type) {
    case 'VAL_ART':
      return {
        ...state,
        valueArt: action.payload,
      };

    case 'VAL_TITLE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case 'CLEAR_TITLE':
      return {
        ...state,
        title: '',
      };

    case 'SELECTED':
      return {
        ...state,
        selected: action.payload,
        flag: false,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchValue: action.payload,
      };

    case 'SET_TITLE_EDIT_START':
      return {
        ...state,
        isPostEdit: true,
      };

    case 'SET_TITLE_EDIT_SUCCESS':
      return {
        ...state,
        title: action.payload.title,
        valueArt: action.payload.text,
        idPostEdit: action.payload.id,
        isPostEdit: false,
        sendPostEdited: true,
      };

    case 'SENT_POST_EDIT':
      return {
        ...state,
        sendPostEdited: false,
      };

    case 'SET_IMG':
      return {
        ...state,
        photoUrl: action.payload,
      };

    case 'HIDE_BLOCK_COM':
      return {
        ...state,
        flag: true,
      };

    default:
      return state;
  }
}
