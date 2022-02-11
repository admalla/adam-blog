import { instance } from '../../config/axios';

export const valueArticle = (string) => {
  return {
    type: 'VAL_ART',
    payload: string,
  };
};

export const setSearchValue = (string) => {
  return {
    type: 'SET_SEARCH',
    payload: string,
  };
};

export const setTitleForEdit = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_TITLE_EDIT_START',
  });
  const { data } = await instance.get(`/posts/${id}`);
  console.log(data);
  dispatch({
    type: 'SET_TITLE_EDIT_SUCCESS',
    payload: { title: data.title, text: data.text, id: data._id },
  });
};

export const hideBlockComments = () => {
  return {
    type: 'HIDE_BLOCK_COM',
  };
};
