import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import ItemSeriesRow from './item_series_row.js';

@observer
export default class ItemSeries extends React.Component {
  static propTypes = {
    series: PropTypes.object,
    readOnly: PropTypes.bool,
    seriesLabel: PropTypes.string.isRequired,
    counterLabel: PropTypes.string.isRequired,
    type: PropTypes.oneOf([ 'time', 'weight' ]),
    setR: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    minus: PropTypes.func.isRequired,
    plus: PropTypes.func.isRequired,
    minusT: PropTypes.func.isRequired,
    plusT: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'weight',
    readOnly: false,
    series: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      item: this.props.series
    };
  }

  componentWillMount() {
    I18n.initAsync();
  }

  render() {
    const { seriesLabel, counterLabel, type, series, minusT, plusT, setR, setValue } = this.props;

    return (
      <View style={innerStyles.subSeries}>
        <ItemSeriesRow
          {...this.props}
          type = 'sub'
          label={I18n.t(seriesLabel)}
          value={`${series.repeats}` || '0'}
          onChange = {(repeats) => {
            setR(series, repeats);
          }}
        />

        <ItemSeriesRow
          {...this.props}
          type = 'sub'
          minus = {minusT}
          plus = {plusT}
          label={I18n.t(counterLabel)}
          value={`${type === 'weight' ? series.weight : series.time}` || '0'}
          onChange = {(value) => {
            setValue(series, value);
          }}
        />
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  subSeries: {
    borderColor: '#fff',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    flexDirection:'column'
  }
});

I18n.fallbacks = true;
