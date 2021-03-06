import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/DataTable.css'
import { withStyles } from '@material-ui/core/styles';
import GraphRow from './GraphRow.jsx'



const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


class DataTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resourceType: this.props.resourceType,
            itemNames: this.props.itemNames,
            currentDate: this.props.updateDate,
            priceData: [],
            addItemFunction: this.props.addItemFunction
        }
    }

    render() {
        return (
            <div className="dataTableContainer">
                <TableContainer component={Paper} elevation={2}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left"></StyledTableCell>
                                <StyledTableCell align="left">{this.state.resourceType}</StyledTableCell>
                                <StyledTableCell align="right">Price (ISK)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.itemNames.map((name) => 
                            <GraphRow key={name} itemName={name} date={this.state.currentDate}></GraphRow>
                          )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default DataTable
