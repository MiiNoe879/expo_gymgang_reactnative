import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <View style = {{ alignItems: 'center' }}>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'

          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({ date });
          }}
        />
      </View>
    );
  }
}
