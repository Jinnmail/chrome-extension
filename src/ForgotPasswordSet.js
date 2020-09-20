import React, { Fragment, useEffect } from 'react';
import {withRouter} from "react-router-dom";
import {Grid, Button, TextField, InputAdornment, Tooltip, IconButton, Hidden} from '@material-ui/core';
import {Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon} from '@material-ui/icons';
import Footer from './Footer';

function ForgotPasswordSet(props) {
  const [resetToken, setResetToken] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [allowedToSubmit, setAllowedToSubmit] = React.useState(false)
  const [passwordErrorText, setPasswordErrorText] = React.useState('');
  const [values, setValues] = React.useState({
    password: '', 
    showPassword: false
  });

  const onPasswordChanged = (prop) => (event) => {
    if(/(?=.{12,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])/.test(event.target.value)) {
      setAllowedToSubmit(true);
    }  else { 
      setAllowedToSubmit(false);
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSaveClicked = async () => {
    if (allowedToSubmit) {
      const res = await fetch(`${process.env.REACT_APP_API}/user/forgot/password/reset`, {
        method: 'POST', 
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({email: localStorage.getItem('email'), token: localStorage.getItem('resetPasswordToken'), password: values.password})
      })
      const json = await res.json();
      if (!json.error) {
        props.history.push('/login') 
      } else {
        setPasswordErrorText(json.error)
      }
    }
  }

  return (
    <Fragment>
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="stretch">
        <Grid item xs={23}>
          <h2 style={{textAlign: 'center', color: 'gray'}}>Set new password.</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            variant='outlined'
            label='Password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={onPasswordChanged('password')}
            fullWidth
            error={passwordErrorText !== ''}
            helperText={passwordErrorText || "Min 12 chars. At least 1 number, 1 capital letter, and 1 symbol"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Show/Hide typing">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={() => props.history.push('/signedin')}>Never mind Keep as is</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" fullWidth onClick={onSaveClicked} disabled={!allowedToSubmit}>Save new password</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default withRouter(ForgotPasswordSet);
