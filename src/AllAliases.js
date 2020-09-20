import React from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectUserAliases} from './userAliasesSlice';
import {Grid} from '@material-ui/core';
import NavBar from './NavBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Typography';
import Footer from './Footer';

function AllAliases(props) {
  let userAliases = useSelector(selectUserAliases);
  let sortedAliases = [...userAliases]
  sortedAliases.sort((a, b) => {
    if (a.alias < b.alias) {
      return -1;
    }
    if (a.alias > b.alias) {
      return 1;
    }
    return 0;
  })

  const onAliasClick = (aliasId) => {
    props.history.push(`/alias/${aliasId}`)
  }
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      {/* <Grid item xs={12}>
        {sortedAliases.map(alias => {
          return (
            <div>
              {alias.alias} 
            </div>
          )
        })}
      </Grid> */}
      <Grid item xs={12} style={{lineBreak: 'anywhere'}}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell>Alias</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {sortedAliases.map(alias => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Button style={{wordWrap: 'break-word'}} onClick={() => onAliasClick(alias.aliasId)}>{alias.alias}</Button>
                  </TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default withRouter(AllAliases);