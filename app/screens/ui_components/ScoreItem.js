import React from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import scoreIcon from '../../assets/icons/shared/score.png';
import scoreCheckedIcon from '../../assets/icons/shared/scoreChecked.png';

const SCORES = [ 'score1', 'score2', 'score3', 'score4', 'score5' ];

export default class ScoreItem extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.oneOf([ 'middle', 'small' ]),
    score: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    name: '',
    id: 'category',
    size: 'middle',
    score: 0,
    onPress: () => {}
  }

  renderScoresList = () => {
    const { score, id, size, onPress } = this.props;

    return (
      <View style={innerStyles.scoreContainer}>
        {SCORES.map((item, index) => (
          <TouchableHighlight key={item} onPress={onPress.bind(null, id, index + 1)} underlayColor='rgba(255,255,255,0.2)'>
            <Image
              source={Math.floor(score) > index ? scoreCheckedIcon : scoreIcon}
              style={[ innerStyles.icon, size === 'small' ? innerStyles.iconSmall : {} ]}
            />
          </TouchableHighlight>
        ))}
      </View>
    );
  }

  render() {
    const { name, size } = this.props;

    return (
      <View style={[ innerStyles.container, size === 'small' ? innerStyles.containerSmall : {} ]}>
        {name ? <Text style={[ innerStyles.label, { backgroundColor: 'transparent' } ]}>{name}</Text> : null}

        {this.renderScoresList()}
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    margin: 24,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerSmall: {
    marginBottom: 8
  },
  scoreContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'white',
    maxWidth: 200
  },
  icon: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 12
  },
  iconSmall: {
    width: 18,
    height: 14,
    marginLeft: 6
  }
});
