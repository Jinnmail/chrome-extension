/*global chrome*/
import React, { useEffect } from 'react';
import {Button, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Checkout() {
  
  const payAtDashboardClick = () => {
    chrome.storage.sync.get(['sessionToken'], (token) => {
      if (token) {
        chrome.tabs.create({url: `${process.env.REACT_APP_DASHBOARD_URL}/x/${token.sessionToken}`});
      }
    });
  }

  return (
    <Grid container>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <img
          alt="Random asset from Picsum"
          src="logo.png"
          style={{width: '70%', height: 'auto'}}
        />
      </Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={payAtDashboardClick}
        >
          Pay on Dashboard
        </Button>
      </Grid>
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

export default Checkout;