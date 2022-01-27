import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { EditAndOutIcons } from './EditAndOutIcons';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/creatEditArt/action';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs({ handleClickLogOut, modalOpen }) {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: 'flex', cursor: 'pointer' }}>
        <Input
          onChange={handleChangeSearch}
          style={{ width: 250 }}
          placeholder="Введите текст"
          inputProps={ariaLabel}
        />
        <SearchIcon style={{ marginRight: 7, marginLeft: 7 }} />
        {!token ? (
          <span onClick={modalOpen}>
            <PersonOutlineIcon />
          </span>
        ) : (
          <EditAndOutIcons handleClickLogOut={handleClickLogOut} />
        )}
      </div>
    </Box>
  );
}
