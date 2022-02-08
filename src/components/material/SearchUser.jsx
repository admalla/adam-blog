import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { EditAndOutIcons } from './EditAndOutIcons';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/creatEditArt/action';
import { DebounceInput } from 'react-debounce-input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs({ handleClickLogOut, modalOpen }) {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    console.log(e);
    dispatch(setSearchValue(e.target.value));
  };

  // function debounce(callback, delay) {
  //   let timeout;
  //   return function () {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(callback, delay);
  //   };
  // }

  // const debounceHandle = debounce(handleChangeSearch, 500);

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
        <DebounceInput
          placeholder="Введите текст поиска"
          minLength={2}
          debounceTimeout={300}
          onChange={(event) => handleChangeSearch(event)}
        />

        {/* <Input
          onChange={debounceHandle}
          style={{ width: 250 }}
          placeholder="Введите текст"
          inputProps={ariaLabel}
        /> */}
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
