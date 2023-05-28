import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStyles from './styles';

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  handleShowPassword,
  type,
  helperText,
  error,
  inputRef,
}) => {
  const classes = useStyles();

  return (
    <TextField
      inputRef={inputRef}
      className={classes.helperText}
      style={{ marginBottom: '32px' }}
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      helperText={helperText}
      error={error}
      InputProps={
        name === 'password' || name === 'newPassword'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

export default Input;
