/*global chrome*/
import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Divider, Grid, List, ListItem} from '@material-ui/core';
import Footer from './Footer';

function NotSignedIn(props) {
  // useEffect(() => {
  //   // localStorage.setItem('nameo', "xxxx")
  // }, [])

  const loginClick = async (event) => {
    chrome.tabs.create({ url: `${process.env.REACT_APP_DASHBOARD_URL}/login`})
  }

  const createAccountClick = async (event) => {
    chrome.tabs.create({url: `${process.env.REACT_APP_DASHBOARD_URL}/signup`})
  }

  return (
    <Grid 
      container 
      // style={{height: "100%"}}
    >
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <h2 style={{textAlign: 'center', color: 'gray'}}>Jinnmail</h2> 
        <List>
          <Divider />
        </List>
      </Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        Camouflage your email address.
      </Grid>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        Fight spam, hackers, and surveillance with secret temporary email aliases for every interaction, keeping your address private and spam-free. 
      </Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={loginClick}>Log In</Button> &nbsp;
        <Button variant="outlined" color="primary" onClick={createAccountClick}>Create Account</Button>
      </Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12}>&nbsp;</Grid>
      {/* <Grid item xs={12}>
        <List>
          <Divider />
        </List>
      </Grid> */}
      <Grid item xs={12}>
        <Footer />
      </Grid>
      {/* <Grid item xs={12}>
        <List>
          <Divider />
        </List>
        <span style={{fontSize: '26px'}}>Jinnmail</span> <small style={{color:'gray'}}>v{process.env.NODE_ENV !== 'development' && chrome.app.getDetails().version}</small>
      </Grid> */}
    </Grid>
    // <div style={{border: '1px solid blue', height: "100%"}}>hello</div>
  );
}

export default withRouter(NotSignedIn);