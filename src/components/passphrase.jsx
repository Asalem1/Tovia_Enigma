import axios from 'axios'
import { func, string }  from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'react-toolbox/lib/link';
import React, { Component } from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipLink = Tooltip(Link);

export default class Passphrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
    }
    this.copy = this.copy.bind(this);
  }

  copy() {
    this.setState({
      value: this.props.hash,
      copied: true
    })
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
          <CopyToClipboard
            text={this.props.hash}
            onCopy={this.copy}
          >
            <TooltipLink
              label={this.props.hash}
              tooltip='Click to copy to clipboard'
              className="hash"
            />
            </CopyToClipboard>
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

Passphrase.propTypes = {
  hash: string.isRequired,
  createSalt: func.isRequired,
}

