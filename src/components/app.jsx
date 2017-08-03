import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
      </div>
    )
  }
}
      /*

      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-5 offset-xs-4 tovia-container">
            <header className="row">
              <p className="tovia-header">Tovia's Enigma</p>
            </header>
            <div>
              <form>
                <div className="row name-row">
                  <div className="col-xs-2">
                    <img src="https://www.random.org/analysis/randbitmap-rdo.png" className="image-icon" />
                  </div>
                  <div className="col-xs-5">
                    <div className="row">
                      <label htmlFor="name">Name *</label>
                    </div>
                    <div className="row">
                      <input className="name-input" placeholder="Name *"/>
                    </div>
                  </div>
                </div>
                <div className="row message-row">
                  <div className="row">
                    <p>Message * </p>
                  </div>
                  <div className="row">
                    <input className="message-input" placeholder="Message *"/>
                  </div>
                </div>
                <div className="row expiration-row">
                  <div className="row">
                    <p>Expiration date * </p>
                  </div>
                  <div className="row">
                    <input className="expiration-input" placeholder="Expiration date *"/>
                  </div>
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
              <p>Your Passphrase - <a href="#"> Rp9Vz </a></p>
            </div>
          </div>
          <div className="row">
            <a href="#">Generate new Passphrase</a>
          </div>
        </div>
      </div>
      */
