import Inputs from '../components/material/SearchUser';
import styles from '../style/pages/main.module.scss';
import { Article } from '../components/Article';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getAllComments } from '../redux/comments/action';
import logo from '../1489.gif';
import { getDelComment } from '../redux/comments/action';
import { instance } from '../config/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { ButtonAnime } from '../components/Animation';

export default function MainPage({ setComment, handleClickLogOut, modalOpen }) {
  const flag = useSelector((state) => state.menu.flag);
  const items = useSelector((state) => state.menu.items);
  const artActiv = useSelector((state) => state.article.selected);
  const flagArt = useSelector((state) => state.article.flag);
  const comments = useSelector((state) => state.comments.items);
  const name = useSelector((state) => state.menu.items).map((el) => el.user.fullName);
  const loading = useSelector((state) => state.comments.loading);
  const setLoadComment = useSelector((state) => state.comments.setLoadComment);

  console.log(flagArt);

  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const artSelected = (id) => {
    const item = items.find((item) => item._id === id);
    dispatch({
      type: 'SELECTED',
      payload: item,
    });
  };

  const handleChangetext = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId = artActiv._id;
    setComment({ text, postId });
    e.target.reset();
    setText('');
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

  const handleClickEditCom = async (postId, id) => {
    const text = prompt('Измените текст');
    await instance.patch(`/comments/${id}`, { text });
    getAllCommentsArticle(postId);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.about}>
        <div>
          <h1>Pavel Durov</h1>
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
                  ? `http://localhost:5656/${artActiv.photoUrl}`
                  : 'https://chto-eto-takoe.ru/uryaimg/32574385521dd1847f7d1e5b940491ef.jpg'
              }
              alt="img"
            ></img>
          </div>
          <div>
            <h3>{flagArt ? 'Обо мне' : artActiv.title}</h3>
            <p>
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
          {!flagArt && (
            <div className={styles.wrapper_comment}>
              <h3>Комментарии ({comments.length}) </h3>
              {comments.map((item) => {
                return (
                  <div className={styles.comments}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4>{name[0]}</h4>
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
                    <div
                      style={{ marginTop: 13, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <div>{loading ? 'загрузка...' : item.text}</div>
                      <ButtonAnime
                        handleClickEditCom={() => handleClickEditCom(item.post, item._id)}
                        handleClickDelCom={() => handleClickDelCom(item._id)}
                      />
                    </div>
                  </div>
                );
              })}
              <h4>Добавить комментарий:</h4>
              <form onSubmit={handleSubmit}>
                <textarea
                  className={styles.set_comment}
                  value={text}
                  onChange={handleChangetext}
                  cols="83"
                  name="text"
                  rows="7"
                ></textarea>
                {setLoadComment ? (
                  <img src={logo} alt="loader_image" />
                ) : (
                  <button type="onSubmit">Отправить</button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
      <div className={flag ? styles.black_news_small : styles.block_news}>
        <div className={styles.input}>
          <h3>Pavel's Blog</h3>
          <Inputs handleClickLogOut={handleClickLogOut} modalOpen={modalOpen} />
        </div>
        <Article getAllCommentsArticle={getAllCommentsArticle} artSelected={artSelected} />
      </div>
    </div>
  );
}
