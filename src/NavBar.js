import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Search from './Search';

function NavBar(props) {
  const user = useSelector((state) => state.userAliases.user);

  // useEffect(() => {

  //   fetchData(aliasId)
  // }, [])

  return (
    <Grid container>
      <Grid item xs={2} style={{textAlign: 'left'}}>
        <IconButton onClick={() => props.history.push('/signedin')}><AccountCircleIcon /></IconButton>
      </Grid>
      <Grid item xs={6} style={{textAlign: 'center', alignSelf: 'center'}}>
        <Typography>{user && user.email}</Typography>
      </Grid>
      <Grid item xs={4} style={{textAlign: 'right'}}>
        <IconButton onClick={() => props.history.push('/account')}><SettingsIcon /></IconButton>
      </Grid>
      <Grid item xs={12}>
        <Search />
      </Grid>
    </Grid>
  )
}

export default withRouter(NavBar);