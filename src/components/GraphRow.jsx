import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../styles/DataTable.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Graph from './Graph.jsx'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      },
    },
  }))(TableRow);

class GraphRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            key: this.props.key,
            rowData: this.props.rowData,
            open: false
        }
    }

    fetchData(item_name) {
        
    }

    render() {
        return (
            <React.Fragment>
                <TableRow key={this.state.key}>
                    <StyledTableCell align="left">
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setState({open: !this.state.open})}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        {this.state.rowData.item_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{this.state.rowData.item_price}</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Graph
                                startTime={0}
                                currentTime={13000}
                                min={309}
                                max={410}
                                data={this.fetchData(this.state.rowData.item_name)}
                            ></Graph>
                        </Collapse>
                    </StyledTableCell>
                </TableRow>
            </React.Fragment>
        )
    }
}

export default GraphRow

