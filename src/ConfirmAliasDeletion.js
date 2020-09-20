import React from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {deleteAlias} from './userAliasesSlice';
import {DeleteForever as DeleteForeverIcon, } from '@material-ui/icons';
import {
  Button,  
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,  
  IconButton, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    maxwidth: "100%", padding: "10px"
  }, 
  rotate: {
    transform: "rotate(-180deg)"
  }, 
  paper: {
    position: 'absolute',
    // width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function ConfirmAliasDeletion(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const {aliasId, alias} = props

  const classes = useStyles();

  const handleClickModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = async (agree) => {
    if (agree === true) { // explicity test for true hitting backdrop passes an object
      await dispatch(deleteAlias(aliasId));
      props.history.goBack();
    }
    setModalOpen(false);
  }

  return (
    <div>
      <IconButton>
        <DeleteForeverIcon onClick={handleClickModalOpen} /> 
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-descriptixon"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to permanently delete this alias?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to use {alias} ever again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalClose(false)} color="primary">
            Nevermind
          </Button>
          <Button onClick={() => handleModalClose(true)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withRouter(ConfirmAliasDeletion);