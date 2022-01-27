import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../style/pages/profile.module.scss';

export function Username() {
  const name = useSelector((state) => state.menu.items).map((el) => el.user.fullName);

  return (
    <div className={styles.user_name}>
      <h1> {name[0]} </h1>
    </div>
  );
}
