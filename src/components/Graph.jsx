import {Background, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryGroup, VictoryLabel} from 'victory'
import Paper from "@material-ui/core/Paper"
import React from 'react'
import TableCell from '@material-ui/core/TableCell';



class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphData: this.props.data,
            max: this.props.max
        }
    }

    render() {
        return (
            <Paper elevation={1}>
                <VictoryGroup>
                    <VictoryLine 
                        height={250}
                        width={250}
                        data={this.state.graphData}
                    />
                    <VictoryAxis
                        style={{
                            tickLabels: {fontSize: 4, padding: 5}
                        }}
                        theme={VictoryTheme.material}
                        fontSize={1}
                        scale={{ x: "time" }}
                        tickFormat={(t, i) => {
                            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(t);
                            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(t);
                            return (`${da}-${mo}`);
                        }}
                        height={250}
                        width={250}
                        fixLabelOverlap={true}
                    />
                    <VictoryAxis dependentAxis
                        style={{
                            tickLabels: {fontSize: 4, padding: 5}
                        }}
                        theme={VictoryTheme.material}
                        domain={[0, this.state.max + 10]}
                        fontSize={1}
                        domainPadding={{x: [10, -10], y: 5}}
                        height={250}
                        width={250} 
                        fixLabelOverlap={true}
                    />
                </VictoryGroup>
            </Paper>
        )
    }

}

export default Graph