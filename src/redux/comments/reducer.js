const initialState = {
  loading: false,
  setLoadComment: false,
  items: [],
  comForEdit: {},
  isEditComment: true,
  loadComEdit: false,
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

    case 'EDIT_COMMENT':
      return {
        ...state,
        comForEdit: state.items.find((item) => item._id === action.payload),
        isEditComment: false,
      };

    case 'COM_EDIT_START':
      return {
        ...state,
        loadComEdit: true,
      };

    case 'COM_EDIT_SUCCESS':
      return {
        ...state,
        items: action.payload,
        isEditComment: true,
        loadComEdit: false,
      };

    default:
      return state;
  }
};
