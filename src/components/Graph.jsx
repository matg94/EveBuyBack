import {Background, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryGroup, VictoryLabel} from 'victory'
import React from 'react'


class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graphData: this.props.data,
            min: this.props.min,
            max: this.props.max
        }
    }

    render() {
        return (
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
                    domain={[-90, 0]}
                    fontSize={1}
                    domainPadding={{x: [10, -10], y: 5}}
                    height={250}
                    width={250}
                    label="Days from today"
                    axisLabelComponent={<VictoryLabel dy={8} />}
                />
                <VictoryAxis dependentAxis
                    style={{
                        tickLabels: {fontSize: 4, padding: 5}
                    }}
                    theme={VictoryTheme.material}
                    domain={[this.state.min - 10, this.state.max + 10]}
                    fontSize={1}
                    domainPadding={{x: [10, -10], y: 5}}
                    height={250}
                    width={250} 
                />
            </VictoryGroup>
        )
    }

}

export default Graph