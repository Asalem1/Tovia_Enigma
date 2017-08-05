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
      hash: '',
    }
  }

  handleDecryption(event) {
    event.preventDefault();
    fetch('/api/encrypt')
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the res in decrypt: ', res)
    })
    .catch((err) => {
      console.error('here is the error decrypting: ', err);
    });
  }

  handleEncryption(event) {
    event.preventDefault();
    const { message, expiration, hash } = this.state
    fetch('/api/encrypt', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        expiration: expiration,
        hash: hash
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the res: ', res);
    })
    .catch((err) => {
      console.error('here is the error encrypting: ', err);
    });
  }

  setMessageValue(event) {
    const { value }= event.target;
    this.setState({ message: value });
  }

  render() {
    let { visibility, message } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-4 offset-xs-4 tovia-container">
            <header className="row">
              <p className="tovia-header">{"Tovia's Enigma"}</p>
            </header>
            <div>
              <form onSubmit={this.handleEncryption.bind(this)}>
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
                    ref="message"
                    setMessageValue={this.setMessageValue.bind(this)}
                    visibility={visibility}
                    value={message}
                  />
                </div>
                <div className="row expiration-row">
                  <Expiration
                    ref="expiration"
                   />
                </div>
                <br />
                <div>
                  <Encryption
                    handleEncryption={this.handleEncryption.bind(this)}
                    handleDecryption={this.handleDecryption.bind(this)}
                  />
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
