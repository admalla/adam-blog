import React from 'react';
import InputIcon from '@mui/icons-material/Input';
import styles from '../style/pages/PageArtCreate.module.scss';
import { Article } from '../components/Article';
import { useDispatch, useSelector } from 'react-redux';
import Inputs from '../components/material/SearchUser';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { instance } from '../config/axios';
import { items_User } from '../redux/mainPage/action';

export function PageArticleCreate({ handleClickLogOut, modalOpen, valueArt }) {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.menu.flag);
  const text = useSelector((state) => state.article.valueArt);
  const title = useSelector((state) => state.article.title);
  const photoUrl = useSelector((state) => state.article.photoUrl);
  const isPostEdit = useSelector((state) => state.article.isPostEdit);
  const sendPostEdited = useSelector((state) => state.article.sendPostEdited);
  const idPostEdit = useSelector((state) => state.article.idPostEdit);

  const handleFormArticle = async (e) => {
    e.preventDefault();
    valueArt('');
    if (sendPostEdited) {
      await instance.patch(`/posts/${idPostEdit}`, { title, text });
      dispatch({ type: 'SENT_POST_EDIT' });
      const response = await instance.get('/posts?limit=3').then(({ data }) => data);
      dispatch(items_User({ items: response.items, total: response.total }));
      dispatch({ type: 'CLEAR_TITLE' });
    } else {
      await instance.post('/posts', { title, text, photoUrl, description: 'article' });
      dispatch({ type: 'CLEAR_TITLE' });
      const res = await instance.get('/posts?limit=3').then(({ data }) => data);
      dispatch(items_User({ items: res.items, total: res.total }));
    }
  };

  const handleChangeForArticle = async (e) => {
    if (e.target.name === 'photoUrl') {
      const formatData = new FormData();
      const file = e.target.files?.[0];
      formatData.append('file', file);

      const res = await instance
        .post('/posts/upload', formatData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res);
      dispatch({
        type: 'SET_IMG',
        payload: res.data.url,
      });
    }

    if (e.target.name !== 'photoUrl') {
      dispatch({
        type: 'VAL_TITLE',
        payload: { name: e.target.name, value: e.target.value },
      });
    }
  };

  const handleChange = (string) => {
    valueArt(string);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.edit_article}>
        <h1>{sendPostEdited ? 'Редактирование статьи' : 'Создание статьи'}</h1>
        <form onSubmit={handleFormArticle} className={styles.forma} method="post">
          <h4>Описание</h4>
          <textarea
            value={isPostEdit ? 'Загрузка...' : title}
            onChange={handleChangeForArticle}
            rows="5"
            cols="50"
            name="title"
          ></textarea>
          <h4>Ссылка на изображение</h4>
          <span>
            <input name="photoUrl" onChange={handleChangeForArticle} type="file" />
          </span>
          <SimpleMDE value={isPostEdit ? 'Загрузка...' : text} onChange={handleChange} />
          {sendPostEdited ? (
            <button type="submit">Сохранить</button>
          ) : (
            <button type="submit">Опубликовать</button>
          )}
        </form>
      </div>
      <div className={flag ? styles.article_small : styles.article}>
        <Inputs handleClickLogOut={handleClickLogOut} modalOpen={modalOpen} />
        <Article />
      </div>
    </div>
  );
}
