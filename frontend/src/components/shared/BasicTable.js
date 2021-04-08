import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    margin: '1em',
  },
  table: {
    minWidth: 0,
  },
});

const BasicTable = ({ rows, values }) => {
  const classes = useStyles()

  console.log(rows)

  return <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {rows.map(row => <TableCell>{row.label}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map(value => <TableRow key={value.date}>
            {rows.map(row => <TableCell>{value[row.key]}</TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
}

export default BasicTable