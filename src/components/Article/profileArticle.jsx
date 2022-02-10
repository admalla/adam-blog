import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Stack } from '@mui/material';
import Pagination from '@material-ui/lab/Pagination';
import styles from '../../style/pages/main.module.scss';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export function ProfileArticle({
  handleClickSelect,
  handleClickEdit,
  handleClickDel,
  handleChangPage,
}) {
  const posts = useSelector((state) => state.menu.userPosts);
  const id = localStorage.getItem('id');
  const userPageQty = useSelector((state) => state.menu.userPageQty);
  const page = useSelector((state) => state.menu.page);
  const currentPerPage = Math.ceil(userPageQty / 3);

  return (
    <Container>
      {posts.map((item) => {
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
                    ? `/${item.photoUrl}`
                    : 'https://chto-eto-takoe.ru/uryaimg/32574385521dd1847f7d1e5b940491ef.jpg'
                }
                alt="img"
              ></img>
            </div>
          </div>
        );
      })}
      <Stack spacing={2}>
        {!!userPageQty && (
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
