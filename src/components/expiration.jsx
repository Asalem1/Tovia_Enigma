import React, { Component } from 'react';

export default class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      visibility: 'hidden',
    }
    this.triggerCalendar = this.triggerCalendar.bind(this);
  }

  triggerCalendar(event) {
    //modal calendar;
    const { value }= event.target;
    this.setState({ value: value });
    if (!value.length) {
      this.setState({ visibility: 'hidden' })
    } else {
      this.setState({ visibility: 'visible' })
    }
  }

  render() {
    const visibility = {
      visibility: this.state.visibility,
      transition: '0.1s ease',
      fontSize: '12px',
    }
    return (
      <div className="container">
        <label style={visibility} htmlFor="expiration">Expiration date *</label>
        <input
          className="expiration-input"
          placeholder="Expiration date *"
          onChange={this.triggerCalendar}
          defaultValue={this.state.value}
        />
      </div>
    )
  }
}

