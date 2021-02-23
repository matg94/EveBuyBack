import {Paper, Switch} from '@material-ui/core'
import React from 'react'
import DataTable from './DataTable.jsx'
import '../styles/DataTable.css'
import myData from '../BuyBackData.json'
import itemConfig from '../item_config.json'
import itemIds from '../item_ids.json'

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableNames: itemConfig.tableNames,
            items: itemConfig,
            itemIds: itemIds
        }
    }

    async componentDidMount() {
        var items = {}
        await this.state.tableNames.map(
            (tablename) => {
                items[tablename] = this.fetchItemData(tablename)
            })
        this.setState({
            itemData: items
        })
    }

    async fetchItemData(tableName) {
        var data = []
        this.state.items[tableName].map(
            (item_name) => {
                fetch("https://api.eve-echoes-market.com/market-stats/".concat(this.state.itemIds[item_name]))
                .then(res => res.json())
                .then(
                    (result) => {
                        var obj = {}
                        obj["item_name"] = item_name
                        obj["item_price"] = this.getVolumeBasedAverage(result)   
                    }
                )
            }
        )
        return data;
    }

    getVolumeBasedAverage(tesdf)
    {
        return 1;
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
        console.log(totalVolume)
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
        console.log(average)
        return average
    }

    createTable(tableName) {
        return (
            <DataTable key={tableName} resourceType={tableName} rowsData={this.state.itemData[tableName]}></DataTable>
            )
    }

    render() {
        return (
            <div>
                <h1>Buy Back Program</h1>
                <br></br>
                <div className="multipleTablesContainer">
                    {this.state.tableNames.map((tableName) => this.createTable(tableName))}
                </div>
                <br></br>
        </div>
        )
    }
}

export default MainPage
