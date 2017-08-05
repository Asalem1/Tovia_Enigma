import React, { Component } from 'react';
import Encryption from './encryption';
import Expiration from './expiration';
import Message from './message';
import Name from './name';
import Passphrase from './passphrase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      expiration: '',
    }
  }

  render() {
    const { expiration, message } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-4 offset-xs-4 tovia-container">
            <header className="row">
              <p className="tovia-header">{"Tovia's Enigma"}</p>
            </header>
            <div>
              <form>
                <div className="row name-row">
                  <div className="col-xs-2">
                    <img src="https://www.random.org/analysis/randbitmap-rdo.png" alt="https://www.random.org/analysis/randbitmap-rdo.png" className="image-icon" />
                  </div>
                  <div className="col-xs-9">
                    <Name />
                  </div>
                </div>
                <div className="row message-row">
                  <Message
                    message={message}
                  />
                </div>
                <div className="row expiration-row">
                  <Expiration
                    expiration={expiration}
                   />
                </div>
                <br />
                <div>
                  <Encryption />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row passphrase-component">
          <Passphrase />
        </div>
      </div>
    )
  }
}
      /*

      */
