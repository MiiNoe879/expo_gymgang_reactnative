import React from 'react';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ItemSeriesRow from './item_series_row.js';

@observer
export default class ItemCardSeries extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    item: PropTypes.string,
    readOnly: PropTypes.bool,
    minus: PropTypes.func.isRequired,
    plus: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: '',
    item: 0,
    readOnly: false
  }

  render() {
    const { item, title, set } = this.props;

    return (
      <ItemSeriesRow
        {...this.props}
        label={I18n.t(`define_cardio.${title}`)}
        value={`${item}` || '0'}
        onChange = {(repeats) => {
          set(title, repeats);
        }}
      />
    );
  }
}
