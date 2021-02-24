import {Paper, Switch} from '@material-ui/core'
import React from 'react'
import DataTable from './DataTable.jsx'
import '../styles/DataTable.css'
import myData from '../BuyBackData.json'

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    async componentDidMount() {
        let conf = require('../item_config.json')
        this.setState({
            itemConfig: conf,
            tableNames: conf.tableNames,
            isLoaded: true
        })
    }

    createTable(tableName) {
        return (
           <DataTable key={tableName} resourceType={tableName} itemNames={this.state.itemConfig[tableName]}></DataTable>
            )
    }

    render() {
        return (
            <div>
                <h1>Buy Back Program</h1>
                <br></br>
                <div className="multipleTablesContainer">
                    {this.state.isLoaded ? this.state.tableNames.map((tableName) => this.createTable(tableName)) : <p>Loading...</p>}
                </div>
                <br></br>
        </div>
        )
    }
}

export default MainPage
