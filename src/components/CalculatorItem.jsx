import React from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class CalculatorItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            volume: this.props.volume,
            price: this.props.price
        }
    }

    render() {
        return (
            <TableRow>
                <TableCell>
                    {this.state.name}
                </TableCell>
                <TableCell>
                    {this.props.volume}
                </TableCell>
                <TableCell>
                    {this.state.price}
                </TableCell>
                <TableCell>
                    {this.state.volume * this.state.price}
                </TableCell>
            </TableRow>
        )
    }
}

export default CalculatorItem