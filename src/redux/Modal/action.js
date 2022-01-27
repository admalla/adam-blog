export const modalOpen = () => {
  return {
    type: 'OPEN_MODAL',
  };
};

export const modalClose = () => {
  return {
    type: 'CLOSE_MODAL',
  };
};

export const inputUserValue = (name, value) => {
  return {
    type: 'INP_VALUE',
    payload: {
      name,
      value,
    },
  };
};

export const onToggle = () => {
  return {
    type: 'ON_TOGGLE',
  };
};
