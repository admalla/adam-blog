export const menu_Class = () => {
  return {
    type: 'ADD_CLASS',
  };
};

export const pageUser = () => {
  return {
    type: 'PAGE_USER',
  };
};

export const value_User = (obj) => {
  return {
    type: 'USER',
    payload: obj,
  };
};

export const posts_UserById = (posts) => {
  return {
    type: 'GET_USER_POSTS',
    payload: posts,
  };
};

export const items_User = ({ items, total }) => {
  return {
    type: 'GET_ITEMS',
    payload: { items, total },
  };
};

export const setDeletePost = (id) => {
  return {
    type: 'POST_DEL',
    payload: id,
  };
};
