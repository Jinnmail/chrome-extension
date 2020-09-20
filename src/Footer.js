/*global chrome*/
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {Divider, Grid, List} from '@material-ui/core';

function Footer() {
  const user = useSelector((state) => state.userAliases.user);
  const userInvitesArr = useSelector((state) => state.userAliases.userInvitesArr);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} style={{textAlign: 'right'}}>
          {user && user.invites && <small>{user.invites} Premium Invites Remaining</small>}
        </Grid>
        <Grid item xs={12}>
          <List>
            <Divider />
          </List>
        </Grid>
        <Grid item xs={12}>
          <span style={{fontSize: '26px'}}>Jinnmail</span> <small style={{color:'gray'}}>v{process.env.NODE_ENV !== 'development' && chrome.app.getDetails().version}</small>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Footer;

    {/* <Grid item xs={12} style={{position: 'absolute', bottom: 10}}> */}