import React from 'react';
import styles from '../../style/pages/profile.module.scss';

export function Username() {
  const name = window.localStorage.getItem('userName');

  return (
    <div className={styles.user_name}>
      <h1> {name} </h1>
    </div>
  );
}
