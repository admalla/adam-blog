const initialState = {
  loading: false,
  setLoadComment: false,
  items: [],
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENT_START':
      return {
        ...state,
        loading: true,
      };

    case 'GET_COMMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case 'SET_COMMENT_START':
      return {
        ...state,
        setLoadComment: true,
      };

    case 'SET_COMMENT_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        setLoadComment: false,
      };

    case 'DEL_COM':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};
