import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, InputAdornment, Link, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Button, IconButton, Tooltip} from '@material-ui/core';
import {FileCopy as FileCopyIcon} from '@material-ui/icons';
import {fetchUserAliases, selectUserAliases} from './userAliasesSlice';
import SearchIcon from '@material-ui/icons/Search';
import {detectURL} from './functions';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Search(props) {
  const userAliases = useSelector(selectUserAliases);
  const userAliasesStatus = useSelector((state) => state.userAliases.status);
  const [openCopyAliasTooltip, setOpenCopyAliasTooltip] = React.useState('Copy alias');
  const [keepOpen, setKeepOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAliasesStatus === 'idle') {
      dispatch(fetchUserAliases())
    }
  }, [userAliasesStatus, dispatch])

  const copyAliasClicked = (event, alias) => {
    var aux = document.createElement("input");
    aux.setAttribute("value", alias);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    setOpenCopyAliasTooltip('Copied!');
  };

  const closeAliasTooltip = () => {
    setOpenCopyAliasTooltip('Copy alias');
  };

  const fillAliasClick = (refferedUrl) => {
    window.open(refferedUrl, "_blank")
  }

  const onSearchChange = (event) => {
    // alert(event.target.value)
    setSearchValue(event.target.value)
    setKeepOpen(true);
  }

  const searchOnClick = () => {
    setKeepOpen(false);
  }

  const editClick = (aliasId) => {
    props.history.push(`/alias/${aliasId}`)
  }

  return (
    <Autocomplete
      freeSolo
      inputValue={searchValue}
      options={userAliases}
      disableCloseOnSelect
      open={keepOpen}
      getOptionLabel={(option) => option.alias + option.refferedUrl}
      renderOption={(option, { selected }) => (
        <Grid container>
          <Grid item xs={8} style={{lineBreak: 'anywhere'}}>
            {
              detectURL(option.refferedUrl)
              ? (
                  <Tooltip title="Fill alias" placement="left">
                    <Typography onClick={() => fillAliasClick(option.refferedUrl)}>
                      {option.refferedUrl}
                      <br />
                      {option.alias}
                    </Typography>
                  </Tooltip>
                )
              :
                <div>
                  {option.refferedUrl}
                  <br />
                  {option.alias}
                </div>
            }
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right'}}>
            <Tooltip title={openCopyAliasTooltip} onClose={closeAliasTooltip} placement="top" enterDelay={100} leaveDelay={1000}>
              <FileCopyIcon onClick={(event) => copyAliasClicked(event, option.alias)} />
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Edit & more">
              <Button variant="outlined" onClick={() => editClick(option.aliasId)}>&gt;</Button>
            </Tooltip>
          </Grid>
        </Grid>
      )}
      renderInput={(params) => (
        <TextField {...params} onChange={onSearchChange} onClick={searchOnClick} variant="outlined" label="Search" placeholder="Aliases" />
      )}
    />
  );
}

export default withRouter(Search);