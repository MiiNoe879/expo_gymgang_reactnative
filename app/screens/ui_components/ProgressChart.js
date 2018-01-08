import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryLabel
} from 'victory-native';

export default class ProgressChart extends React.Component {
  static propTypes = {
    ticks: PropTypes.array,
    data: PropTypes.array,
    yLabel: PropTypes.string
  }

  static defaultProps = {
    data: [ { x:1, y:0 }, { x:2, y:0 } ],
    ticks: [ 1, 2 ],
    yLabel: 'chart'
  }

  render() {
    const { ticks, yLabel, data } = this.props;

    return (
      <VictoryChart>
        <VictoryAxis
          tickValues={ticks}
          tickFormat={(x) => (`${x}`)}
          label={I18n.t('statistics.days')}
          dependentAxis={false}
          style={{
            axis: { stroke: '#A07CEB' },
            axisLabel: { fontSize: 16, padding: 30, fill: '#a07ceb', fontFamily: 'inherit', fontWeight: 'bold', angle: 90 },
            tickLabels: { fill: '#fff', fontWeight: 'bold', fontFamily: 'inherit' }
          }}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={(y) => (`${Math.round(y)}`)}
          label={yLabel}
          axisLabelComponent={<VictoryLabel dy={20} dx={20} />}
          style={{
            axis: { stroke: 'transparent' },
            grid: { stroke: '#A07CEB' },
            axisLabel: { fontSize: 16, fill: '#a07ceb', fontFamily: 'inherit', fontWeight: 'bold' },
            tickLabels: { fill: '#fff', fontWeight: 'bold', fontFamily: 'inherit' }
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: '#47C0EC' },
            parent: { border: '1px solid #ccc' }
          }}
          data={data}
        />
        <VictoryScatter
          data={data}
          size={15}
          style={{ data: { fill: '#47C0EC' }, labels: { fill: 'white', fontSize: 12 } }}
          labels={(datum) => datum.y}
          labelComponent={<VictoryLabel dy={12} />}
        />
      </VictoryChart>
    );
  }
}
