import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import SquareGrid from 'react-native-square-grid';

import ItemBodyPart from '../custom_items/item_body_part';

const noImagePath = 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/blank_avatar.png?alt=media&token=d2fa3207-5c51-4ad0-8590-cea65f5768f0';

export default class PartsList extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onPressItem: PropTypes.func,
    handleImage: PropTypes.func,
    isPerson: PropTypes.boolean
  }

  static defaultProps = {
    onPressItem: () => {},
    handleImage: null,
    isPerson: false
  }

  renderItem = (item) => {
    const { label, onPressItem, handleImage } = this.props;

    return (
      <ItemBodyPart
        click={() => onPressItem(item)}
        title={!this.props.isPerson ? I18n.t(`${label}.${item.name || item[Object.keys(item)[0]].name}`) : item.name}
        img={handleImage ? handleImage(item) : item.img}
        isPerson={this.props.isPerson}
      />
    );
  }

  render() {
    return (
      <SquareGrid
        style={innerStyles.bodyPartList}
        columns={3}
        items={this.props.items}
        renderItem={this.renderItem}
      />
    );
  }
}

const innerStyles = StyleSheet.create({
  bodyPartList: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap'
  }
});
