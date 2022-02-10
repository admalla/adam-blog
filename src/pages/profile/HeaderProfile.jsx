import React from 'react';
import styles from '../../style/pages/profile.module.scss';
import Inputs from '../../components/material/SearchUser';

export function HeaderProfile({ handleClickLogOut }) {
  const name = window.localStorage.getItem('userName');

  return (
    <div className={styles.profile_header}>
      <div>
        <h5>{name} blog</h5>
      </div>
      <div className={styles.profile_icons}>
        <Inputs handleClickLogOut={handleClickLogOut} />
      </div>
    </div>
  );
}
