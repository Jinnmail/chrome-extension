import React, { Fragment, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {LoginUtil} from './LoginUtil';
import NavBar from './NavBar';
import {Button, Grid, Hidden, IconButton, InputAdornment, TextField, Tooltip} from '@material-ui/core'
import {
  CheckCircleOutline as CheckCircleOutlineIcon, 
  MailOutline as MailOutlineIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons'
import Footer from './Footer';

function Account(props) {
  const [user, setUser] = React.useState(null);
  const [allowedToSubmit, setAllowedToSubmit] = React.useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('');
  const [values, setValues] = React.useState({
    password: '', 
    showPassword: false, 
    confirm: '', 
    showConfirm: false
  });
  const [confirmVerified, setConfirmedVerified] = React.useState();

  const location = {
    pathname: '/changePassword',
    state: {prevPath: '/account'}
  }

  useEffect(() => {
    const userId = JSON.parse(atob(localStorage.getItem("jinnmailToken").split('.')[1])).userId
    fetchData(userId)
  }, [])

  const fetchData = async (userId) => {
    const res = await fetch(`${process.env.REACT_APP_API}/user/${userId}`, 
      {headers: {'Authorization': localStorage.getItem('jinnmailToken')}
    });
    const json = await res.json();
    setUser(json);
  }

  const onPasswordChanged = (prop) => async (event) => {
    event.preventDefault()
    const value = event.target.value;
    if (/(?=.{12,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])/.test(event.target.value)) {
      const res = await fetch(`${process.env.REACT_APP_API}/user/session`, {
        method: 'post', 
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({email: user.email, password: value})
      })
      const json = await res.json();
      if (!json.error) {
        setShowSuccessIcon(true);
        if (confirmVerified) {
          setAllowedToSubmit(true);
        } else {
          setAllowedToSubmit(false);
        }
      } else {
        setShowSuccessIcon(false);
        setAllowedToSubmit(false);
        setPasswordErrorText(json.error)
      }
    }  else {
      setAllowedToSubmit(false);
      setShowSuccessIcon(false);
    }
    setPasswordErrorText('');
    setValues({ ...values, [prop]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onConfirmChanged = (prop) => (event) => {
    if(/(?=.{12,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])/.test(event.target.value)) {
      setAllowedToSubmit(true);
      setConfirmedVerified(true);
    }  else {
      setConfirmedVerified(false);
      setAllowedToSubmit(false);
    }
    setPasswordErrorText('');
    setValues({ ...values, [prop]: event.target.value});
  };

  const handleClickShowConfirm = () => {
    setValues({ ...values, showConfirm: !values.showConfirm });
  };

  const handleMouseDownConfirm = (event) => {
    event.preventDefault();
  };

  const onSavePasswordClicked = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/user/forgot/password/resetNoResetPasswordToken`, {
        method: 'POST', 
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify({email: user.email, password: values.confirm})
      })
      const json = await res.json();
      if (!json.error) {
        setPasswordErrorText('');
        setValues({...values, password: '', confirm: ''});
        setConfirmedVerified(false);
        setShowSuccessIcon(false);
        setAllowedToSubmit(false);
      } else {
        setPasswordErrorText(json.error)
      }
  }

  return (
    <Fragment>
      <Grid container space={2}>
        <Grid item xs={12}>
          {LoginUtil.loggedIn() && <NavBar />}
        </Grid>
        <Grid item xs={12}>
          &nbsp;
        </Grid>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <h2 style={{color: 'gray'}}>Preferences</h2>
        </Grid>
        <Grid item xs={12}>
          <div>
            <MailOutlineIcon style={{verticalAlign: 'middle', width: 20, height: 20}}></MailOutlineIcon> 
            <small>&nbsp; {user && user.invites} Premium Invites Remaining</small>
          </div>
          <div>
            <Link to='/invites' style={{textDecoration: 'none'}}>
              <Button variant="outlined" color="primary">
                Manage Invites &gt;
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h3 style={{color: 'gray'}}>Account Email</h3>
        </Grid>
        <Grid item xs={12} style={{textAlign: 'left'}}>
          &nbsp;&nbsp;&nbsp;<b style={{color: 'gray'}}>All aliases will forward to this address.</b>
        </Grid>
        <Grid item xs={12}>
          &nbsp;&nbsp;&nbsp;{user && user.email}
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

export default withRouter(Account);

// import React from 'react';
// import {Link} from 'react-router-dom';
// import {LoginUtil} from './LoginUtil';
// import NavBar from './NavBar';

// const Account = () => {
//   const location = {
//     pathname: '/dashboard/change-password',
//     state: {prevPath: '/account'}
//   }

//   return (
//     <div>
//       {LoginUtil.loggedIn() && <NavBar />}
//       Account
//       <small>
//         <Link to={location}>Forgot Password?</Link>
//       </small>
//     </div>
//   )
// }

// export default Account;

// import React from 'react';
// import {useSelector} from 'react-redux';
// import {Grid} from '@material-ui/core';
// import NavBar from './NavBar'

// function Account() {
//   const user = useSelector((state) => state.userAliases.user);

//   return (
//     <Grid container>
//       <Grid item xs={12}>
//         <NavBar />
//       </Grid>
//       <Grid item xs={12}>
//         &nbsp;
//       </Grid>
//       <Grid item xs={12}>
//         <b>Account</b>
//       </Grid>
//       <Grid item xs={12}>
//         {user && user.email} 
//       </Grid>
//     </Grid>
//   )
// }

// export default Account;