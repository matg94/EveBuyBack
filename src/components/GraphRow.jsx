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
            itemName: this.props.itemName,
            itemPrice: 0,
            itemIds: itemIds,
            isLoaded: false,
            open: false,
        }
    }

    componentDidMount() {
        var time = new Date().valueOf() / 1000
        fetch("https://api.eve-echoes-market.com/market-stats/".concat(this.state.itemIds[this.state.itemName]))
            .then(res => res.json())
            .then((data) => this.setState({
                itemAllData: data,
                itemPrice: this.getVolumeBasedAverage(data, time-86400, time),
                graphData: this.fetchGraphData(data)
            }))
            .then(() => this.setState({
                isLoaded: true,
            }))
    }

      getVolumeBasedAverage(itemData, startTime, endTime) {
        var average=0
        var totalVolume = 0
        itemData.filter(
            function(entry) {
                if (entry["volume"] == "null") {
                    return false;
                }
                if (parseInt(entry["time"]) > startTime && parseInt(entry["time"]) < endTime) {
                    return true
                }
            })
        .map((entry) => 
            totalVolume += entry["volume"]
        )
        itemData.filter(
            function(entry) {
                if (entry["volume"] == "null" || entry["volume"] < 1) {
                    return false;
                }
                if (parseInt(entry["time"]) > startTime && parseInt(entry["time"]) < endTime) {
                    return true
                }
            })
        .map((entry) => {
            var percentVolume = parseInt(entry["volume"]) / totalVolume
            average = average + (entry["buy"]*percentVolume)
            average = Math.floor(average)
        })
        if (average < 1 || isNaN(average)) {
            return 1
        }
        return average
    }

    fetchGraphData(itemData) {
        var i;
        var plotData = [];
        var max = 0;
        var min = 1000000;
        var time = new Date().valueOf()/1000
        for (i=1;i<30;i++) { 
            var startTime = (time) - (86400*i);
            var endTime = time - (86400*(i-1));
            var avg = this.getVolumeBasedAverage(itemData, startTime, endTime);
            if (avg === 1) continue;
            plotData.push({x:i, y:avg})
            if (avg > max) {
                max = avg;
            }
            if (avg < min) {
                min = avg;
            }
        }
        this.setState({
            graphData: plotData,
            min: min,
            max: max,
            graphLoaded: true
        })
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
                                currentTime={30}
                                min={this.state.min}
                                max={this.state.max}
                                data={this.state.graphData}
                            ></Graph>
                        </Collapse>
                    </StyledTableCell>
                </TableRow>
            </React.Fragment>
        )
    }
}

export default GraphRow

