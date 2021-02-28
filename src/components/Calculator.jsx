import React from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CalculatorItem from './CalculatorItem.jsx';
import itemIds from '../item_ids.json'
import { withStyles } from '@material-ui/core/styles';


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
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);



class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dropdownOptions: [],
            itemOptions: [],
            selectedType: '',
            selectedItem: '',
            selectedVolume: 0,
            allItems: [],
            date: new Date().setHours(0,0,0),
            itemIds: itemIds,
            loaded:false
        }
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
    }

    componentDidMount() {
        let conf = require('../item_config.json')
        this.setState({
            dropdownOptions: conf.tableNames,
            itemOptions: conf,
            selectedType: 'Ores',
            selectedItem: 'Spodumain',
            currentTotal: 0,
            loaded: true
        }, this.getItemPrice)
    }

    handleVolumeChange(event) {
        this.setState({
            selectedVolume: event.target.value
        })
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


    addItem() {
        var index = this.findItemInAllItems(this.state.selectedItem)
        if (index != false || index === 0) {
            var arr = this.state.allItems
            arr[index].volume = parseInt(this.state.allItems[index].volume) + parseInt(this.state.selectedVolume)
            this.setState({
                allItems: arr
            })
        } else {
            var arr = this.state.allItems
            arr.push({
                name: this.state.selectedItem,
                category:this.state.selectedType,
                volume: this.state.selectedVolume,
                price: this.state.selectedPrice
            })
            this.setState({
                allItems: arr
            })
        }
    }

    getItemPrice() {
        var time = this.state.date.valueOf() / 1000
        fetch("https://api.eve-echoes-market.com/market-stats/".concat(this.state.itemIds[this.state.selectedItem]))
            .then(res => res.json())
            .then((data) => this.setState({
                selectedPrice: this.getVolumeBasedAverage(data, time-86400, time)
            }))
    }

    findItemInAllItems(itemName) {
        for (var i=0; i <this.state.allItems.length; i++) {
            if (this.state.allItems[i].name === itemName) {
                return i
            }
        }
        return false
    }

    calculateTotal() {
        var total = 0
        this.state.allItems.map((item) => {
            total += item.price * item.volume
        })
        return total
    }


    handleChangeType(event) {
        this.setState({
            selectedType: event.target.value,
            selectedItem: this.state.itemOptions[event.target.value][0]
        }, this.getItemPrice)
    }

    handleChangeItem(event) {
        this.setState({
            selectedItem: event.target.value
        }, this.getItemPrice)
    }

    render() {
        return (
            <div className="dataTableContainer">
            <TableContainer component={Paper} elevation={2}>
                <Table aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left">Item Name</StyledTableCell>
                            <StyledTableCell align="center">Volume</StyledTableCell>
                            <StyledTableCell align="center">Item Price (ISK)</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right">Total Price (ISK)</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allItems.map((itemData) => 
                            <CalculatorItem 
                                name={itemData.name} 
                                key={itemData.name} 
                                volume={itemData.volume} 
                                price={itemData.price}
                                updateDate={this.state.date}></CalculatorItem>    
                        )}
                        <TableRow>
                                <StyledTableCell colSpan={4} align="left">
                                    <h3>
                                        Total:
                                    </h3>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <h3>
                                    {this.calculateTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </h3>
                                </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="left">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={this.handleChangeType}
                                    value={this.state.selectedType}
                                    >
                                    {this.state.loaded ? this.state.dropdownOptions.map((name) => {
                                        return <MenuItem key={name} value={name}>{name}</MenuItem>
                                    }) : <MenuItem value="">No Type Selected</MenuItem>}
                                </Select>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Select
                                    labelId="select-item"
                                    id="select-item-id"
                                    onChange={this.handleChangeItem}
                                    value={this.state.selectedItem}
                                    >
                                    {(this.state.selectedType != '' && this.state.loaded) ? this.state.itemOptions[this.state.selectedType].map((name) => {
                                        return <MenuItem key={name} value={name}>{name}</MenuItem>
                                    }) : <MenuItem value="">No Type Selected</MenuItem>}
                                </Select>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    id="volume-number"
                                    label="Volume"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleVolumeChange.bind(this)}
                                    variant="outlined"
                                    />
                                </StyledTableCell>
                            <StyledTableCell>
                                <h2>Price: {this.state.selectedPrice ? this.state.selectedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "loading.."} (ISK)</h2>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button 
                                    aria-label="Add item"
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={this.addItem.bind(this)}
                                >Add</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }

}

export default Calculator


