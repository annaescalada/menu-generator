import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { useStyles } from '../../Header/styles'


const BasicTable = ({ rows, values }) => {
  console.log(values)
  const classes = useStyles()
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