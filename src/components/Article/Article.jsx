import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items_User, posts_UserById, setDeletePost } from '../../redux/mainPage/action';
import { instance } from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { hideBlockComments, setTitleForEdit } from '../../redux/creatEditArt/action';
import { ProfileArticle } from './profileArticle';
import { AllUsersArticle } from './allUsersArticle';
import axios from 'axios';

export function Article({ getAllCommentsArticle, artSelected }) {
  const page = useSelector((state) => state.menu.page);
  const searchValue = useSelector((state) => state.article.searchValue);
  const userId = localStorage.getItem('id');
  const dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    async function getArticle() {
      if (window.location.pathname === `/profile/${userId}`) {
        const response = await axios
          .get(`/users/${userId}?query=${searchValue}&page=${page}&limit=3`)
          .then(({ data }) => data);
        dispatch(posts_UserById(response.posts));
      } else {
        const response = await instance
          .get(`/posts?query=${searchValue}&page=${page}&limit=3`)
          .then(({ data }) => data);
        dispatch(items_User({ items: response.items, total: response.total }));
      }
    }
    getArticle();
  }, [dispatch, page, searchValue, userId]);

  const handleClickDel = async (id) => {
    if (window.confirm('Ты уверен, что хочешь удалить пост')) {
      await instance.delete(`/posts/${id}`);
      dispatch(setDeletePost(id));
      dispatch(hideBlockComments());
      const response = await axios
        .get(`/users/${userId}?query=${searchValue}&page=${page}&limit=3`)
        .then(({ data }) => data);
      dispatch(posts_UserById(response.posts));
    }
  };

  const handleClickEdit = (id) => {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#edit')) {
        navigate(`/post/${id}/edit`);
        dispatch(setTitleForEdit(id));
      }
    });
  };

  const handleClickSelect = (id, e) => {
    if (e.target.tagName !== 'path') {
      navigate(`/post/${id}`);
      artSelected(id);
      getAllCommentsArticle(id);
    }
  };

  const handleChangPage = (num) => {
    dispatch({
      type: 'SET_PAGE',
      payload: num,
    });
  };

  return (
    <>
      {window.location.pathname === `/profile/${userId}` ? (
        <ProfileArticle
          handleChangPage={handleChangPage}
          handleClickSelect={handleClickSelect}
          handleClickEdit={handleClickEdit}
          handleClickDel={handleClickDel}
        />
      ) : (
        <AllUsersArticle
          handleChangPage={handleChangPage}
          handleClickSelect={handleClickSelect}
          handleClickEdit={handleClickEdit}
          handleClickDel={handleClickDel}
        />
      )}
    </>
  );
}
