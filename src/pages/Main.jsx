import Inputs from '../components/material/SearchUser';
import styles from '../style/pages/main.module.scss';
import { Article } from '../components/Article/Article';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllComments, selectComForEdit, setEditComment } from '../redux/comments/action';
import logo from '../1489.gif';
import { getDelComment } from '../redux/comments/action';
import { instance } from '../config/axios';
import { ButtonAnime } from '../components/Animation';

export default function MainPage({ artSelected, setComment, handleClickLogOut, modalOpen }) {
  const flag = useSelector((state) => state.menu.flag);
  const userNameCom = useSelector((state) => state.comments.items);
  const artActiv = useSelector((state) => state.article.selected);
  const flagArt = useSelector((state) => state.article.flag);
  const comments = useSelector((state) => state.comments.items);
  const name = window.localStorage.getItem('userName');
  const loading = useSelector((state) => state.comments.loading);
  const setLoadComment = useSelector((state) => state.comments.setLoadComment);
  const token = window.localStorage.getItem('token');
  const commentForEdit = useSelector((state) => state.comments.comForEdit);
  const isEditComment = useSelector((state) => state.comments.isEditComment);
  const loadComEdit = useSelector((state) => state.comments.loadComEdit);

  const [text, setText] = useState('');

  const dispatch = useDispatch();

  function nameCreateComFunc(id) {
    const nameCreateCom = userNameCom.filter((item) => item._id === id);
    return nameCreateCom.map((item) => item.user.fullName);
  }

  const handleChangetext = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditComment) {
      const postId = artActiv._id;
      setComment({ text, postId });
      e.target.reset();
      setText('');
    } else {
      dispatch(setEditComment(commentForEdit._id, text, commentForEdit.post));
      setText('');
    }
  };

  const getAllCommentsArticle = (id) => {
    dispatch(getAllComments(id));
  };

  const handleClickDelCom = (id) => {
    if (window.confirm('точно удалить?')) {
      instance.delete(`/comments/${id}`);
      dispatch(getDelComment(id));
    }
  };

  const handleClickEditCom = (postId, id) => {
    dispatch(selectComForEdit(id));
  };

  useEffect(() => {
    setText(commentForEdit.text);
  }, [commentForEdit.text]);

  const funcLoad = (id, text) => {
    if (id === commentForEdit._id) {
      if (loadComEdit) {
        return 'загрузка...';
      } else {
        return text;
      }
    }
    return text;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.about}>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <h2>Блог фронтед-разработчик</h2>
        </div>
        <div>
          <div>
            <img
              className={styles.photoUser}
              src={
                artActiv.photoUrl
                  ? `/${artActiv.photoUrl}`
                  : 'https://chto-eto-takoe.ru/uryaimg/32574385521dd1847f7d1e5b940491ef.jpg'
              }
              alt="img"
            ></img>
          </div>
          <div>
            <h3>{flagArt ? 'Обо мне' : artActiv.title}</h3>
            <p className={styles.textArt}>
              {flagArt ? (
                <span>
                  Lorem ipsum cursus at metus diam ultricies lorem donec ligula duis rutrum pharetra
                  porta maecenas eget auctor fusce urna a: tellus et pellentesque vivamus Lorem
                  ipsum cursus at metus diam ultricies lorem donec ligula duis rutrum pharetra porta
                  maecenas eget auctor fusce urna a: tellus et pellentesque vivamus
                </span>
              ) : (
                artActiv.text
              )}
            </p>
          </div>

          <div className={styles.wrapper_comment}>
            <h3>Комментарии ({comments.length}) </h3>
            {comments.map((item) => {
              return (
                <div className={styles.comments}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>{nameCreateComFunc(item._id)}</h4>
                    <p>
                      {new Date(item.createdAt).toLocaleString('ru', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      })}
                    </p>
                  </div>
                  <div style={{ marginTop: 13, display: 'flex', justifyContent: 'space-between' }}>
                    <div>{loading ? 'загрузка...' : funcLoad(item._id, item.text)}</div>
                    {token && (
                      <ButtonAnime
                        handleClickEditCom={() => handleClickEditCom(item.post, item._id)}
                        handleClickDelCom={() => handleClickDelCom(item._id)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            {token && (
              <>
                <h4>Добавить комментарий:</h4>
                <form onSubmit={handleSubmit}>
                  <textarea
                    className={flag ? styles.set_comment_small : styles.set_comment}
                    value={text}
                    onChange={handleChangetext}
                    name="text"
                    rows="7"
                  ></textarea>
                  {setLoadComment ? (
                    <img src={logo} alt="loader_image" />
                  ) : isEditComment ? (
                    <button type="onSubmit">Отправить</button>
                  ) : (
                    <button type="onSubmit">Сохранить</button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={flag ? styles.block_news_small : styles.block_news}>
        <div className={styles.input}>
          <h3>{token ? `${name}'s Blog` : ''}</h3>
          <Inputs handleClickLogOut={handleClickLogOut} modalOpen={modalOpen} />
        </div>
        <Article getAllCommentsArticle={getAllCommentsArticle} artSelected={artSelected} />
      </div>
    </div>
  );
}
