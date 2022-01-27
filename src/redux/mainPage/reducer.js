const initialState = {
  flag: false,
  isRegistered: true,
  userToken: null,
  useName: '',
  items: [],
  page: 1,
  pageQty: 0,
};

export function menuReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CLASS':
      return {
        ...state,
        flag: !state.flag,
      };

    case 'PAGE_USER':
      return {
        ...state,
        isRegistered: !state.isRegistered,
      };

    case 'USER':
      return {
        ...state,
        userToken: action.payload.token,
        userName: action.payload.userName,
      };

    case 'GET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        pageQty: action.payload.total,
      };

    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };

    case 'NEW_POST':
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case 'POST_DEL':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
}
