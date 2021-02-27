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
            isLoaded: true,
            updateDate: new Date().setHours(0, 0, 0, 0)
        })
    }

    createTable(tableName) {
        return (
           <DataTable key={tableName} resourceType={tableName} itemNames={this.state.itemConfig[tableName]} updateDate={this.state.updateDate}></DataTable>
            )
    }

    getFormattedDate() {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.updateDate);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.updateDate);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.updateDate);
        return (`${da}-${mo}-${ye}`);
    }

    render() {
        return (
            <div>
                <h1>Buy Back Program</h1>
                <br></br>
                <h3>Last update: {this.getFormattedDate()}</h3>
                <div className="multipleTablesContainer">
                    {this.state.isLoaded ? this.state.tableNames.map((tableName) => this.createTable(tableName)) : <p>Loading...</p>}
                </div>
                <br></br>
        </div>
        )
    }
}

export default MainPage
