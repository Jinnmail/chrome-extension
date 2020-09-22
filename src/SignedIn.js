/*global chrome*/
import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUser} from './userAliasesSlice';
import {LoginUtil} from './LoginUtil';
import NavBar from './NavBar';
import AliasForm from './AliasForm';
import {Button, Grid, MenuItem, MenuList, Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
}));

function SignedIn(props) {
  // const [openCopyAliasTooltip, setOpenCopyAliasTooltip] = React.useState('Copy alias');
  const [openCreateAliasModal, setCreateAliasModalOpen] = React.useState(false);

  const user = useSelector((state) => state.userAliases.user);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = JSON.parse(atob(localStorage.getItem("jinnmailToken").split('.')[1])).userId
    dispatch(fetchUser(userId))
  }, [])

  const onAllAliasesClick = () => {
    props.history.push('/allAliases');
  }

  const handleCreateAliasModalOpen = () => {
    setCreateAliasModalOpen(true);
  };

  const handleCreateAliasModalClose = () => {
    setCreateAliasModalOpen(false);
  };

  const handleLogout = () => {
    LoginUtil.logOut();
    props.history.push('/notSignedIn');
  }

  const handleDashboard = () => {
    chrome.storage.sync.get(['sessionToken'], (token) => {
        if (token) {
          chrome.tabs.create({ url: `${process.env.REACT_APP_DASHBOARD_URL}/x/${token.sessionToken}`})
        }
    });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <Modal
          open={openCreateAliasModal}
          onClose={handleCreateAliasModalClose}
          className={classes.modal}
        >
          <AliasForm handleCreateAliasModalClose={handleCreateAliasModalClose} />
        </Modal>
        <MenuList>
          <MenuItem onClick={onAllAliasesClick}>
            <Grid container>
              <Grid item xs={11}>
                All aliases
              </Grid>
              <Grid item xs={1} style={{textAlign: 'right'}}>
                &gt;
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem onClick={handleCreateAliasModalOpen}>
            <Grid container>
              <Grid item xs={11}>
                Create new alias
              </Grid>
              <Grid item xs={1} style={{textAlign: 'right'}}>
                &gt;
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem onClick={handleDashboard}>
            <Grid container>
              <Grid item xs={11}>
                Go to dashboard
              </Grid>
              <Grid item xs={1} style={{textAlign: 'right'}}>
                &gt;
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Grid container>
              <Grid item xs={11}>
                Log out
              </Grid>
              <Grid item xs={1} style={{textAlign: 'right'}}>
                &gt;
              </Grid>
            </Grid>
          </MenuItem>
        </MenuList>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default withRouter(SignedIn);