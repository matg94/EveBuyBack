import React from 'react'
import DataTable from './DataTable.jsx'
import '../styles/DataTable.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Calculator from './Calculator.jsx';
import Paper from '@material-ui/core/Paper';


class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            priceData: [],
            isLoaded: false,
            currentTab: 0,
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            currentTab: newValue
        })
      };

    async componentDidMount() {
        let conf = require('../item_config.json')
        this.setState({
            itemConfig: conf,
            tableNames: conf.tableNames,
            isLoaded: true,
            updateDate: new Date().setHours(0, 0, 0, 0)
        })
    }

    showPage() {
        switch (this.state.currentTab) {
            case 0:
                return <Calculator date={this.state.updateDate}></Calculator>
            case 1:
                return (<div className="multipleTablesContainer">
                    {       this.state.isLoaded ? this.state.tableNames.map((tableName) => this.createTable(tableName)) : <p>Loading...</p>}
                        </div>)
            case 2:
                return <h1>About</h1>
            default:
                return <p>?????</p>
        }
    }

    createTable(tableName) {
        return (
           <DataTable 
                key={tableName} 
                resourceType={tableName} 
                itemNames={this.state.itemConfig[tableName]} 
                updateDate={this.state.updateDate}>
            </DataTable>
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
                <AppBar position="static">
                    <Tabs value={this.state.currentTab} onChange={this.handleChange.bind(this)} aria-label="simple tabs example">
                        <Tab label="Calculator" />
                        <Tab label="Data" />
                        <Tab label="About" />
                    </Tabs>
                </AppBar>
                <Paper elevation={1}>
                    {this.showPage()}
                </Paper>
            </div>
        )
    }
}

export default MainPage

//                <div className="multipleTablesContainer">
//{this.state.isLoaded ? this.state.tableNames.map((tableName) => this.createTable(tableName)) : <p>Loading...</p>}
//</div>