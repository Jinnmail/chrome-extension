import React, { Fragment, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {Button, FormControlLabel, FormGroup, Grid, IconButton, Switch, TextField, Typography} from '@material-ui/core';
import {DeleteForever as DeleteForeverIcon} from '@material-ui/icons';
import ConfirmAliasDeletion from './ConfirmAliasDeletion';
import NavBar from './NavBar';
import Footer from './Footer';

function Alias() {
  let { aliasId } = useParams();
  const [alias, setAlias] = React.useState(null);
  const [nameButtonText, setNameButtonText] = React.useState('edit');
  const [nameTextReadOnly, setNameTextReadOnly] = React.useState(true);
  const [nameTextValue, setNameTextValue] = React.useState('');

  useEffect(() => {
    fetchData(aliasId)
  }, [aliasId]);

  const fetchData = async (aliasId) => {
    const res = await fetch(`${process.env.REACT_APP_API}/alias/alias/${aliasId}`, {
      method: 'GET', 
      headers: {'Authorization': localStorage.getItem('jinnmailToken')}
    });
    const json = await res.json();
    setAlias(json.data);
    setNameTextValue(json.data.refferedUrl);
  }

  const editNameClick = async (aliasId) => {
    if (nameButtonText === 'edit') {
      setNameTextReadOnly(false);
      setNameButtonText('save')
    } else {
      const res = await fetch(`${process.env.REACT_APP_API}/alias/${aliasId}`, 
      {
        method: 'PUT', 
        headers: {
          'Content-type': 'application/json', 
          'Authorization': localStorage.getItem('jinnmailToken')
        }, 
        body: JSON.stringify({aliasId: aliasId, name: nameTextValue})
      })
      const json = await res.json()
      const alias = json.data;
      const res2 = await fetch(`${process.env.REACT_APP_API}/alias/alias/${aliasId}`, {
        method: 'GET', 
        headers: {'Authorization': localStorage.getItem('jinnmailToken')}
      });
      const json2 = await res2.json();
      const alias2 = json2.data;
      setNameTextValue(alias2.refferedUrl);
      setNameTextReadOnly(true);
      setNameButtonText('edit');
    }
  }

  const onNameTextChange = (event) => {
    setNameTextValue(event.target.value);
  }

  const onToggleChange = async (aliasId, newStatus) => {
    const res = await fetch(`${process.env.REACT_APP_API}/alias/status`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json', 
        'Authorization': localStorage.getItem('jinnmailToken')
      }, 
      body: JSON.stringify({aliasId: aliasId, status: !newStatus}), 
    });
    const json = await res.json();
    
    const res2 = await fetch(`${process.env.REACT_APP_API}/alias/alias/${aliasId}`, {
      method: 'GET', 
      headers: {'Authorization': localStorage.getItem('jinnmailToken')}
    });
    const json2 = await res2.json();
    const alias = json2.data;
    setAlias(alias);
  }

  const handleClickModalOpen = () => {
    alert()
    // setModalOpen(true);
  }

  return (
    <Grid container spacing={1}>
      {alias &&
        <Fragment>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Alias"
              value={alias.alias}
              // defaultValue={alias.alias}
              variant="outlined"
              // disabled
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12}>
            &nbsp;
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Name" 
              value={nameTextValue} 
              variant="outlined" 
              fullWidth
              inputProps={{
                readOnly: nameTextReadOnly
              }}
              onChange={onNameTextChange}
            >
            </TextField>
          </Grid>
          <Grid item xs={12} style={{textAlign: 'left'}}>
            <Button variant="outlined" color="primary" onClick={() => editNameClick(alias.aliasId)}>{nameButtonText}</Button>
          </Grid>
          {/* <Grid item xs={12}>&nbsp;</Grid> */}
          <Grid container alignItems="center" spacing={0}>
            <Grid item>&nbsp;</Grid>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch checked={alias.status} onChange={() => onToggleChange(alias.aliasId, alias.status)} />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
          {/* <Grid item xs={12}>&nbsp;</Grid> */}
          <Grid item xs={12}>
            <ConfirmAliasDeletion aliasId={alias.aliasId} alias={alias.alias} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Fragment>
      }
    </Grid>
  )
}

export default Alias;