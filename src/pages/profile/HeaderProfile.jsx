import React from 'react';
import styles from '../../style/pages/profile.module.scss';
import { useSelector } from 'react-redux';
import Inputs from '../../components/material/SearchUser';

export function HeaderProfile({ handleClickLogOut }) {
  const name = useSelector((state) => state.menu.items).map((el) => el.user.fullName);

  return (
    <div className={styles.profile_header}>
      <div>
        <h5>{name[0]} blog</h5>
      </div>
      <div className={styles.profile_icons}>
        <Inputs handleClickLogOut={handleClickLogOut} />
      </div>
    </div>
  );
}
