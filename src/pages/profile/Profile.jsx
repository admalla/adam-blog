import { Article } from '../../components/Article';
import { Username } from './UserName';
import styles from '../../style/pages/profile.module.scss';
import { HeaderProfile } from './HeaderProfile';
import { useSelector } from 'react-redux';

export function Profile({ handleClickLogOut }) {
  const flag = useSelector((state) => state.menu.flag);

  return (
    <div className={flag ? styles.wrapper_small : styles.wrapper}>
      <HeaderProfile handleClickLogOut={handleClickLogOut} />
      <div className={styles.profile}>
        <Username />
        <div className={styles.art_profile}>
          <Article />
        </div>
      </div>
    </div>
  );
}
