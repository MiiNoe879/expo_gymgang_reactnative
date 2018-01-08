import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.pl = {
  monthNames: [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień' ],
  monthNamesShort: [ 'Sty.', 'Luty', 'Marz.', 'Kwie.', 'Maj', 'Czer.', 'Lip.', 'Sier.', 'Wrz.', 'Paź.', 'List.', 'Gru.' ],
  dayNames: [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ],
  dayNamesShort: [ 'Nd', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt', 'Sob.' ]
};

LocaleConfig.defaultLocale = 'pl';

export default class StylesCalendar extends React.Component {
  static propTypes = {
    minDate: PropTypes.object,
    markedDates: PropTypes.array.isRequired,
    onDayPress: PropTypes.func.isRequired,
    current: PropTypes.object,
  }

  static defaultProps = {
    minDate: null
  }

  render() {
    const { minDate, markedDates, onDayPress, current } = this.props;
    console.log(current);
    console.log(Date());
    return (
      <Calendar
        theme={{
          currentColor: 'white',
          calendarBackground: '#60449A',
          textSectionTitleColor: 'white',
          dayTextColor: 'white',
          todayTextColor: 'white',
          selectedDayTextColor: 'white',
          monthTextColor: 'white',
          selectedDayBackgroundColor: '#47C0EC',
          arrowColor: 'white'
        }}
        markedDates={markedDates}
        current={current ? current : Date()}
        onDayPress={onDayPress}
        monthFormat={'MMMM yyyy'}
        hideArrows={false}
        hideExtraDays
        disableMonthChange
        firstDay={1}
        hideDayNames={false}
        minDate = {minDate}
      />
    );
  }
}
