import {Background, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryGroup} from 'victory'
import React from 'react'


class Graph extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <VictoryGroup>
                <VictoryLine 
                    interpolation="natural"
                    height={250}
                    width={250}
                    data={this.props.data}
                />
                <VictoryAxis
                    style={{
                        tickLabels: {fontSize: 4, padding: 5}
                    }}
                    theme={VictoryTheme.material}
                    domain={[this.props.startTime, this.props.currentTime]}
                    fontSize={1}
                    domainPadding={{x: [10, -10], y: 5}}
                    height={250}
                    width={250} 
                />
                <VictoryAxis dependentAxis
                    style={{
                        tickLabels: {fontSize: 4, padding: 5}
                    }}
                    theme={VictoryTheme.material}
                    domain={[this.props.min - 10, this.props.max + 10]}
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