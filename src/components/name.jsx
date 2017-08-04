import React, { Component } from 'react';

export default class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      visibility: 'hidden',
    }
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
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
      color: '#7581c9',
      fontSize: '12px',
    }
    const asteriks = {
      color: 'red',
      fontSize: '12px',
    }
    return (
      <div className="container">
        <label style={visibility} htmlFor="expiration">Expiration date <i style={asteriks}>*</i></label>
        <input
          className="name-input"
          placeholder="Name *"
          onChange={this.onValueChange}
          defaultValue={this.state.value}
        />
      </div>
    )
  }
}

