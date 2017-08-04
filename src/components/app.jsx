import React, { Component } from 'react';
import Expiration from './expiration';
import Message from './message';
import Name from './name';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
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
                    <img src="https://www.random.org/analysis/randbitmap-rdo.png" className="image-icon" />
                  </div>
                  <div className="col-xs-9">
                    <Name />
                  </div>
                </div>
                <div className="row message-row">
                  <Message />
                </div>
                <div className="row expiration-row">
                  <Expiration />
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-2">
                  <button>ENCRYPT</button>
                  </div>
                  <div className="col-sm-2 offset-sm-3">
                  <button>DECRYPT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row passphrase-component">
          <div className="row">
            <div>
              <p>Your Passphrase - <a> Rp9Vz </a></p>
            </div>
          </div>
          <div className="row">
            <a>Generate new Passphrase</a>
          </div>
        </div>
      </div>
    )
  }
}
      /*

      */
