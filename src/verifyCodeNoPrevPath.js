/*global chrome*/
import React, {Fragment, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Button, Grid} from '@material-ui/core';
import {CheckCircleOutline as CheckCircleOutlineIcon} from '@material-ui/icons';
import NumberFormat from 'react-number-format';

function VerifyCode(props) {
  const [showSuccessIcon, setShowSuccessIcon] = React.useState(false);
  let res;

  const verifyCodeChanged = async (event) => {
    const inputNumber = event.target.value.replace(/\s/g, '');
    if (Number(inputNumber)) {
      res = await fetch(`${process.env.REACT_APP_API}/user/code/verify`, {
        method: 'POST', 
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({email: localStorage.getItem('email'), code: inputNumber})
      })
      localStorage.setItem('verifyCode', false);
      const json = await res.json()
      if (!json.error) {
        setShowSuccessIcon(true)
        props.history.push('/login')
      }
    } else {
      setShowSuccessIcon(false)
    }
  }

  const onResendCodeClick = async (event) => {
    event.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API}/user/forgot/passwordResetPasswordToken`, {
      method: 'POST', 
      headers: {'Content-type': 'application/json'}, 
      body: JSON.stringify({email: localStorage.getItem('email')})
    })
  }

  return (
    <Grid 
      container
      direction="row"
      justify="center"
      alignItems="center">
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <h3>Verify email code</h3>
      </Grid>
      <Grid item xs={12}></Grid>
        <Fragment>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            If this account exists...
          </Grid>
          <Grid item xs={12}>&nbsp;</Grid>
        </Fragment> 
      <Grid item xs={12} style={{textAlign: 'center'}}>
        You should have recieved a code emailed to <br />
        [{localStorage.getItem('email')}]. Enter it below.
      </Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      {/* <Grid item xs={1}></Grid> */}
      <Grid item xs={9} style={{textAlign: 'right'}}>
        <NumberFormat format="# # # # # #" allowEmptyFormatting mask="_" style={{height: '50px', width: "145px", fontSize: '20pt', textAlign: 'center'}} onChange={verifyCodeChanged} fullWidth />
        &nbsp;&nbsp;
      </Grid>
      <Grid item xs={3} style={{textAlign: 'left'}}>
        &nbsp; {showSuccessIcon && <CheckCircleOutlineIcon style={{color: 'green', verticalAlign: 'middle', width: 40, height: 40}} />}
      </Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>Not received? <small><a href="#" onClick={onResendCodeClick}>Resend code</a></small></Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Link to="/signUp" style={{textDecoration: 'none'}}>
          <Button variant="outlined" color="primary" fullWidth>Home</Button>
        </Link>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}

export default withRouter(VerifyCode);