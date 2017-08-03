import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button/button';
import CalendarMonth from 'react-toolbox/lib/date_picker/CalendarMonth';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="contact" className="container  ">
        <section>
          <header>
            <p className="contact-header">Reach Out</p>
          </header>
          <hr />
          <form className="form-styling">
            <div>
              <div className="row">
                <div className="col-sm-5">
                  <label  className="contact-label" htmlFor="name">Name </label>
                  <input className="contact-container" type="text" name="name" ref="name" />
                </div>
                <div className="col-sm-5 offset-sm-1">
                  <label  className="contact-label" htmlFor="email">Email</label>
                  <input className="contact-container" type="text" name="email" ref="email" />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-5">
                  <label className="contact-label" htmlFor="message">Message </label>
                </div>
                <div className="col-sm-12">
                  <textarea className="contact-container col-sm-11" name="message" rows="10" ref="message" ></textarea>
                </div>
                <div className="row send-message">
                  <button type="submit" className="send-message-button"> Send Message </button>
                </div>
              </div>
              <br />
            </div>
          </form>
        </section>
      </div>
    )
  }
}
// going to need to use Calendar for project
   // <CalendarMonth getMonth={Month}/>
    /*  <div className="container">
        <div className="row tovia-container">
          <div className="col-md-5 offset-md-3">
            <header className="row">
              <h1>Tovia's Enigma</h1>
            </header>
            <div>
              <form>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://www.random.org/analysis/randbitmap-rdo.png" className="image-icon" />
                  </div>
                  <div className="col-md-5">
                    <div className="row">
                      <label htmlFor="name">Name *</label>
                    </div>
                    <div className="row">
                      <input placeholder="Name *"/>
                    </div>
                  </div>
                </div>
                <div className="row message-row">
                  <div className="row">
                    <p>Message * </p>
                  </div>
                  <div className="row">
                    <input placeholder="Message *"/>
                  </div>
                </div>
                <div className="row expiration-row">
                  <div className="row">
                    <p>Expiration date * </p>
                  </div>
                  <div className="row">
                    <input placeholder="Expiration date *"/>
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
      </div>*/
