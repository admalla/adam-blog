import React from 'react';
import { useSelector } from 'react-redux';
import '../style/modal.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { instance } from '../config/axios';

export function Modal({ pageUser, onToggle, modalClose, modalValue }) {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const isRegistered = useSelector((state) => state.modal.isRegistered);

  const fullName = useSelector((state) => state.modal.fullName);
  const lastName = useSelector((state) => state.modal.lastName);
  const email = useSelector((state) => state.modal.email);
  const password = useSelector((state) => state.modal.password);

  let navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      lastName,
      email,
      password,
    };

    if (isRegistered) {
      await axios.post('http://localhost:5656/auth/register', data).catch('ОШИБКА');
      onToggle();
    } else {
      await axios
        .post('http://localhost:5656/auth/login', { email, password })
        .then((res) => {
          localStorage.setItem('userName', res.data.fullName);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('id', res.data._id);
        })
        .catch('ОШИБКА');
      pageUser();
      modalClose();
    }
    async function authFunc() {
      await axios
        .get('http://localhost:5656/auth/me')
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    }
    authFunc();
    navigate(`/profile/${localStorage.getItem('id')}`);
    e.target.reset();
  };

  const onChangeValue = (e) => {
    modalValue({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className={`modal_wrapper ${isOpened ? 'open' : 'close'}`}>
      <div className="modal_body">
        <div className="reg">
          <div>{isRegistered ? <h2>Регистрация</h2> : <h2>Вход в аккаунт</h2>}</div>
          <div className="modal_close" onClick={modalClose}>
            ✕
          </div>
        </div>
        <form onSubmit={onSubmitForm}>
          {isRegistered && (
            <span>
              <p>имя</p>
              <input onChange={onChangeValue} name="fullName" type="text" />
              <p>фамилия</p>
              <input onChange={onChangeValue} name="lastName" type="text" />
            </span>
          )}
          <p>почта</p>
          <input onChange={onChangeValue} name="email" type="email" />
          <p>пароль</p>
          <input onChange={onChangeValue} name="password" type="password" />
          <button type="submit">{isRegistered ? 'Зарегистрироваться' : 'Ввойти'}</button>
        </form>
        <div onClick={onToggle} className="toggle_reg">
          {isRegistered ? 'Ввойти' : 'Зарегистрироваться'}
        </div>
      </div>
    </div>
  );
}
