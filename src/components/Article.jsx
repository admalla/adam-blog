import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../style/pages/main.module.scss';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { items_User, setDeletePost } from '../redux/mainPage/action';
import { instance } from '../config/axios';
import { Container, Stack } from '@mui/material';
import Pagination from '@material-ui/lab/Pagination';
import { useNavigate } from 'react-router-dom';
import { setTitleForEdit } from '../redux/creatEditArt/action';

export function Article({ getAllCommentsArticle, artSelected }) {
  const items = useSelector((state) => state.menu.items);
  const pageQty = useSelector((state) => state.menu.pageQty);
  const page = useSelector((state) => state.menu.page);
  const searchValue = useSelector((state) => state.article.searchValue);
  const id = localStorage.getItem('id');
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const currentPerPage = Math.ceil(pageQty / 3);

  useEffect(() => {
    async function getArticle() {
      if (window.location.pathname === `/profile/${id}`) {
        const response = await instance
          .get(`/posts?${id}&query=${searchValue}&page=${page}&limit=3`)
          .then(({ data }) => data);
        dispatch(items_User({ items: response.items, total: response.total }));
      } else {
        const response = await instance
          .get(`/posts?query=${searchValue}&page=${page}&limit=3`)
          .then(({ data }) => data);
        dispatch(items_User({ items: response.items, total: response.total }));
      }
    }
    getArticle();
  }, [dispatch, page, searchValue, id]);

  const handleClickDel = async (id) => {
    if (window.confirm('Ты уверен, что хочешь удалить пост')) {
      await instance.delete(`/posts/${id}`);
      dispatch(setDeletePost(id));
      const response = await instance
        .get(`/posts?query=${searchValue}&page=${page}&limit=3`)
        .then(({ data }) => data);
      dispatch(items_User({ items: response.items, total: response.total }));
    }
  };

  const handleClickEdit = (id) => {
    navigate(`/post/${id}/edit`);
    dispatch(setTitleForEdit(id));
  };

  const handleClickSelect = (id) => {
    artSelected(id);
    navigate(`/post/${id}`);
    getAllCommentsArticle(id);
  };

  const handleChangPage = (num) => {
    dispatch({
      type: 'SET_PAGE',
      payload: num,
    });
  };

  return (
    <Container>
      {items.map((item) => {
        return (
          <div id={item._id} onClick={() => handleClickSelect(item._id)} className={styles.article}>
            <div>
              <div className={styles.profile_header_article}>
                <h3>{item.title}</h3>
                {window.location.pathname === `/profile/${id}` && (
                  <span>
                    <EditTwoToneIcon onClick={() => handleClickEdit(item._id)} />
                    <DeleteTwoToneIcon onClick={() => handleClickDel(item._id)} />
                  </span>
                )}
              </div>
              <p>{item.text}</p>
            </div>
            <div>
              <img
                className={styles.article_image}
                src={
                  item.photoUrl
                    ? `http://localhost:5656/${item.photoUrl}`
                    : 'https://chto-eto-takoe.ru/uryaimg/32574385521dd1847f7d1e5b940491ef.jpg'
                }
                alt="img"
              ></img>
            </div>
          </div>
        );
      })}
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={currentPerPage}
            page={page}
            onChange={(_, num) => handleChangPage(num)}
            style={{ margin: '0 auto' }}
          />
        )}
      </Stack>
    </Container>
  );
}
