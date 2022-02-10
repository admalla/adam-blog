import React from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from '../../style/pages/main.module.scss';
import { useNavigate } from 'react-router-dom';

export function EditAndOutIcons({ handleClickLogOut }) {
  const navigate = useNavigate();

  const handleClickEditArt = () => {
    navigate('/post');
  };
  return (
    <div className={styles.icons}>
      <span title="написать">
        <EditOutlinedIcon onClick={handleClickEditArt} fontSize="small" />
      </span>
      <span title="выход">
        <LogoutOutlinedIcon onClick={handleClickLogOut} fontSize="small" />
      </span>
    </div>
  );
}
