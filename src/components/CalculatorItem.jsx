import React from 'react'
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
                <TableCell align="left">
                    {this.state.name}
                </TableCell>
                <TableCell align="center">
                    {this.props.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="center">
                    {this.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell>

                </TableCell>
                <TableCell align="right">
                    {(this.props.volume * this.state.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
            </TableRow>
        )
    }
}

export default CalculatorItem