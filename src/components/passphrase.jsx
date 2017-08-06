import React, { Component } from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

const TooltipLink = Tooltip(Link);

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
      <div>
        <div className="row">
          <div className="col-xs-4 col-lg-2 offset-lg-1">
            <p>
              Your Passphrase -
            </p>
          </div>
          <div className="col-xs-1 offset-xs-4 offset-lg-0 passphrase-hash">
            <TooltipLink
              href="#"
              label={this.props.hash}
              tooltip='Click to copy to clipboard'
              className="hash"
            />
          </div>
        </div>
        <div className="row passphrase-generator">
          <div className="offset-lg-1">
            <a href="#" onClick={this.props.createSalt}>Generate new Passphrase</a>
          </div>
        </div>
      </div>
    )
  }
}

