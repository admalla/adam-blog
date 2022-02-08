const initialState = {
  isOpened: false,
  isRegistered: false,
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpened: false,
        isRegistered: false,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        isOpened: true,
      };

    case 'INP_VALUE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case 'ON_TOGGLE':
      return {
        ...state,
        isRegistered: !state.isRegistered,
      };

    default:
      return state;
  }
}
