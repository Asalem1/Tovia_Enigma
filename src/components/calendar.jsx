import DatePicker from 'react-toolbox/lib/date_picker';
import React, { Component } from 'react';
import { func, object, any }  from 'prop-types';

export default class Calendar extends Component {
  render() {
    return (
      <section>
        <DatePicker
          minDate={this.props.currentDate}
          name='expirationDate'
          label='Expiration date *'
          sundayFirstDayOfWeek
          onChange={this.props.handleChange.bind(this, 'expirationDate')}
          value={this.props.expirationDate}
        />
      </section>
    )
  }
}

Calendar.propTypes = {
  handleChange: func.isRequired,
  currentDate: object.isRequired,
  expirationDate: any.isRequired,
}
