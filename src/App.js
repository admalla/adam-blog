import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MenuBar } from './components/MenuBar';
import { Modal } from './components/Modal';
import MainPage from './pages/Main';
import { PageArticleCreate } from './pages/PageArticleCreate';
import { Profile } from './pages/profile/Profile';
import { set_Comment } from './redux/comments/action';
import { hideBlockComments, valueArticle } from './redux/creatEditArt/action';
import { pageUser, value_User } from './redux/mainPage/action';
import { inputUserValue, modalClose, modalOpen, onToggle } from './redux/Modal/action';

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modal_Close = () => {
    dispatch(modalClose());
  };

  const modal_Value = ({ name, value }) => {
    dispatch(inputUserValue(name, value));
  };

  const on_Toggle = () => {
    dispatch(onToggle());
  };

  const page_User = () => {
    dispatch(pageUser());
  };

  const valueArt = (string) => {
    dispatch(valueArticle(string));
  };

  const valueUser = (obj) => {
    dispatch(value_User(obj));
  };

  const modal_Open = () => {
    dispatch(modalOpen());
  };

  function handleClickLogOut() {
    if (token) {
      window.localStorage.clear();
      valueUser({ token: null });
      dispatch(hideBlockComments());
      navigate('/');
    }
  }

  const setComment = ({ text, postId }) => {
    dispatch(set_Comment({ text, postId }));
  };

  return (
    <div>
      <MenuBar modalOpen={modal_Open} valueUser={valueUser} />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              setComment={setComment}
              modalOpen={modal_Open}
              handleClickLogOut={handleClickLogOut}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile handleClickLogOut={handleClickLogOut} valueUser={valueUser} />}
        />
        <Route
          path="/auth/addarticle"
          element={
            <PageArticleCreate
              handleClickLogOut={handleClickLogOut}
              modalOpen={modal_Open}
              valueUser={valueUser}
              valueArt={valueArt}
            />
          }
        />
      </Routes>
      <Modal
        valueUser={valueUser}
        pageUser={page_User}
        onToggle={on_Toggle}
        modalValue={modal_Value}
        modalClose={modal_Close}
      />
    </div>
  );
}

export default App;
