import React from 'react';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ObservableListStore from '../../../utils/Store';

import ItemSeriesRow from './item_series_row.js';

export default class ItemSeriesCounter extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    readOnly: PropTypes.bool,
    plusClick: PropTypes.func.isRequired,
    minusClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    readOnly: false,
    count: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      readOnly: this.props.readOnly,
      store: ObservableListStore.muscleExericeseSeries
    };
  }

  componentWillMount() {
    I18n.initAsync();
  }

  render() {
    const { plusClick, minusClick, count } = this.props;

    return (
      <ItemSeriesRow
        {...this.props}
        keyboardDisabled
        minus = {minusClick}
        plus = {plusClick}
        label={I18n.t('define_muscle.series_count')}
        value = {count}
      />
    );
  }
}

I18n.fallbacks = true;
