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
import { TrendingUpTwoTone } from '@material-ui/icons';
import itemIds from '../item_ids.json'


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
            itemName: this.props.itemName,
            itemPrice: 0,
            isLoaded: false,
            open: false
        }
    }

    componentDidMount() {
        fetch("https://api.eve-echoes-market.com/market-stats/".concat(this.state.itemIds[this.state.itemName]))
            .then(res => res.json())
            .then((data) => this.setState({
                itemPrice: this.getVolumeBasedAverage(data)
            }))
            .then(() => this.setState({
                isLoaded: true
            }))
    }

      test(itemData) {
        var time = new Date()
        time = time.now
        var average=0
        var totalVolume = 0
        itemData.filter(
            function(entry) {
                if (entry["volume"] == "null") {
                    return false;
                }
                return true;
            })
        .map((entry) => {
            totalVolume += parseInt(entry["volume"])
        })
        itemData.filter(
            function(entry) {
                if (entry["volume"] == "null") {
                    return false;
                }
                return true;
            })
        .map((entry) => {
            var percentVolume = parseInt(entry["volume"]) / totalVolume
            average += parseInt(entry["buy"])*percentVolume
        })
        if (average < 1) {
            return 1
        }
        return average
    }

    getVolumeBasedAverage(data) {
        return 1;
    }

    fetchGraphData() {
        var data = [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
        ]
        return data
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
                        {this.state.itemName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{this.state.isLoaded ? this.state.itemPrice : "Loading..."}</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Graph
                                startTime={0}
                                currentTime={13000}
                                min={309}
                                max={410}
                                data={this.fetchGraphData()}
                            ></Graph>
                        </Collapse>
                    </StyledTableCell>
                </TableRow>
            </React.Fragment>
        )
    }
}

export default GraphRow

