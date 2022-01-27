import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from '../style/animation.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';

export function ButtonAnime({ handleClickEditCom, handleClickDelCom }) {
  const [showDragHandleIcon, setShowDragHandleIcon] = useState(true);
  const [showEditDelCom, setShowEditDelCom] = useState(false);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.on-com')) {
      setShowEditDelCom(false);
    }
  });

  return (
    <div className="on-com" onClick={() => setShowEditDelCom(true)}>
      {showDragHandleIcon && <DragHandleIcon className="on-com" />}
      <CSSTransition
        in={showEditDelCom}
        timeout={600}
        classNames="editDelCom"
        unmountOnExit
        onEnter={() => setShowDragHandleIcon(false)}
        onExited={() => setShowDragHandleIcon(true)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className={styles.edit_icon}>
            <EditIcon onClick={handleClickEditCom} />
          </span>
          <span className={styles.del_icon}>
            <DeleteIcon onClick={handleClickDelCom} />
          </span>
        </div>
      </CSSTransition>
    </div>
  );
}
