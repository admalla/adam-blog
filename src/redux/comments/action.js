import { instance } from '../../config/axios';

export const set_Comment =
  ({ text, postId }) =>
  async (dispatch) => {
    dispatch({
      type: 'SET_COMMENT_START',
    });
    const { data } = await instance.post('/comments', { text, postId });
    dispatch({
      type: 'SET_COMMENT_SUCCESS',
      payload: data,
    });
  };

export const getAllComments = (id) => async (dispatch) => {
  dispatch({
    type: 'GET_COMMENT_START',
  });
  const { data } = await instance.get(`/comments/post/${id}`);
  dispatch({
    type: 'GET_COMMENT_SUCCESS',
    payload: data,
  });
};

export const getDelComment = (id) => {
  return {
    type: 'DEL_COM',
    payload: id,
  };
};

export const selectComForEdit = (id) => {
  return {
    type: 'EDIT_COMMENT',
    payload: id,
  };
};

export const setEditComment = (id, text, postId) => async (dispatch) => {
  dispatch({
    type: 'COM_EDIT_START',
  });
  await instance.patch(`/comments/${id}`, { text });
  const { data } = await instance.get(`/comments/post/${postId}`);
  console.log(data);
  dispatch({
    type: 'COM_EDIT_SUCCESS',
    payload: data,
  });
};
