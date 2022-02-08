import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../style/menuBar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { menu_Class } from '../redux/mainPage/action';
import { hideBlockComments } from '../redux/creatEditArt/action';

export function MenuBar({ modalOpen, valueUser }) {
  const flag = useSelector((state) => state.menu.flag);
  const token = localStorage.getItem('token');
  const item = useSelector((state) => state.menu.items).find((item) => item.user);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleClickMenu = () => {
    menuClass();
  };

  const menuClass = () => {
    dispatch(menu_Class());
  };

  function handleClickOut() {
    if (token) {
      window.localStorage.clear();
      valueUser({ token: null });
      navigate('/');
      dispatch(hideBlockComments());
    } else {
      modalOpen();
    }
  }

  const handleClickCreatArt = () => {
    // eslint-disable-next-line no-lone-blocks
    {
      token ? navigate('/post') : navigate('/');
    }
  };

  const handleClickProfile = () => {
    navigate(`/profile/${item.user._id}`);
  };

  return (
    <div className={flag ? styles.menu_active : styles.menu}>
      {token && <h2>{item?.user.fullName && item.user.fullName}</h2>}
      {token && (
        <p>
          {item?.createdAt &&
            new Date(item.createdAt).toLocaleString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}
        </p>
      )}
      <ul>
        <li>
          <Link style={{ color: 'white', listStyleType: 'none', textDecoration: 'none' }} to="/">
            Главная
          </Link>
        </li>
        {token && <li onClick={handleClickProfile}>Мой профиль</li>}
        {token && <li onClick={handleClickCreatArt}>Создать запись</li>}
        <li onClick={handleClickOut}>{token ? 'Выйти' : 'Войти'}</li>
      </ul>
      <span onClick={handleClickMenu}>
        <MenuIcon />
      </span>
      <h3>меню</h3>
    </div>
  );
}
