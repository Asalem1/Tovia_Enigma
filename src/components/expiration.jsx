import React, { Component } from 'react';

export default class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 'hidden',
    }
  }

  componentDidUpdate() {
    let exp = this.props.expiration.toString().split(' ').splice(1, 3);
    let expiration = [exp[1], exp[0], exp[2]].join(' ');
    this.refs.expiration.value = expiration
  }

  render() {
    // if (!this.refs.expiration.value.length) {
    //   this.setState({ visibility: 'hidden' })
    // } else {
    //   this.setState({ visibility: 'visible' })
    // }
    const visibility = {
      visibility: this.state.visibility,
      transition: '0.1s ease',
      fontSize: '12px',
    }
    return (
      <div className="container expiration-container">
        <div className="row">
          <label style={visibility} className="expiration-label" htmlFor="expiration">Expiration date *</label>
        </div>
        <div className="row">
          <input
            onClick={this.props.openModal}
            className="expiration-input"
            placeholder="Expiration date *"
            ref="expiration"
          />
        </div>
      </div>
    )
  }
}

