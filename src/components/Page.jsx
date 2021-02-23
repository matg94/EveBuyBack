import {Paper, Switch} from '@material-ui/core'
import React from 'react'
import DataTable from './DataTable.jsx'
import '../styles/DataTable.css'

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableNames: [
                "Ores",
                "Planetary Industry"
            ]
        }
    }

    componentDidMount() {
        return {
            
        }
      }

    createTable(tableName) {
        return (
            <DataTable key={tableName} resourceType={tableName} rowsData={this.state.items[tableName]}></DataTable>
        )
    }



    manageCurrentPage() {
        switch (this.props.currentPage) {
            case "Home":
                return <p>HOME</p>
            case "Buy Back Program":
                return (
                    <div>
                        <h1>BUY BACK PROGRAM</h1>
                        <br></br>
                        <div className="multipleTablesContainer">
                            {this.state.tableNames.map((tableName) => this.createTable(tableName))}
                        </div>
                        <br></br>
                    </div>
                )
            default:
                return <p>Page not Found</p>
        }
    }

    render() {
        return this.manageCurrentPage();
    }
}

export default Page
