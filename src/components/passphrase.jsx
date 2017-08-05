import ClipboardButton from 'react-clipboard.js';
import React, { Component } from 'react';

export default class Passphrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
    this.onSuccess = this.onSuccess.bind(this);
    this.getText = this.getText.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
  }

  getText() {
    return 'I\'ll be copied';
  }

  onSuccess() {
    console.info('successfully copied');
  }

  hoverOn() {
    this.setState({ hover: !this.state.hover })
  }

  renderHoverEvent() {
    console.log('this is trigger: ', this)
    if (this.state.hover) {
      return (
        <div>
          <h1>this worked!</h1>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>
            <p>Your Passphrase -
              <ClipboardButton
                className="passphrase"
                component="a"
                button-href="#"
                data-clipboard-text="I'll be copied"
                onSuccess={this.onSuccess}
                onMouseOver={this.hoverOn}
                onMouseLeave={this.hoverOn}
                > Rp9Vz
              </ClipboardButton>
            </p>
            {this.renderHoverEvent}
          </div>
        </div>
        <div className="row">
          <a>Generate new Passphrase</a>
        </div>
      </div>
    )
  }
}

