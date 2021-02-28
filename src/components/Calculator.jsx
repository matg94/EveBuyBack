import React from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CalculatorItem from './CalculatorItem.jsx';
import '../styles/DataTable.css'
import itemIds from '../item_ids.json'


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
        this.setState({
            currentTotal: total
        })
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
                        <TableRow>
                            <TableCell align="left">Item Name</TableCell>
                            <TableCell align="center">Volume</TableCell>
                            <TableCell align="right">Price (ISK)</TableCell>
                        </TableRow>
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
                            <TableCell align="left">
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
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell>
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
                                </TableCell>
                            <TableCell align="right">
                                <AddCircleOutlineRoundedIcon 
                                    aria-label="Add item"
                                    size="small"
                                    onClick={this.addItem.bind(this)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }

}

export default Calculator


