import Avatar from 'react-toolbox/lib/avatar';
import axios from 'axios';
import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Dialog from 'react-toolbox/lib/dialog';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import React, { Component } from 'react';
import theme from 'react-toolbox/lib/card/theme.css';
import Passphrase from './passphrase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      message: '',
      name: '',
      inputComplete: true,
      currentDate: new Date(),
      expirationDate: '', //sets the date
      expirationTime: 0, //sets a numerical date value
      hash: '',
      encrypted: '',
    }
    this.handleEncryption = this.handleEncryption.bind(this);
    this.handleDecryption = this.handleDecryption.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderEncryption = this.renderEncryption.bind(this);
    this.inputIncomplete = this.inputIncomplete.bind(this);
  }

  handleChange(name, value) {
    if (name === 'expirationDate') {
      this.setState({
        [name]: value,
        expirationTime: value.valueOf()
      })
    } else {
      this.setState({[name]: value });
    }
  };

  handleToggle() {
    this.setState({
      active: !this.state.active,
      inputComplete: true,
    });
  }

  componentDidMount() {
    this.createSalt();
    if (window.location.pathname !== '/' ) {
      let pathname = window.location.pathname.substring(1);
      this.setState({ hash: pathname })
    }
  }

  createSalt() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ hash: text });
  }

  handleDecryption() {
    const { hash, message } = this.state;
    axios.get('/api/encrypt/' + hash, {
      params: {
        message: message
      }
    })
    .then((res) => {
      let { message, expirationDate } = res.data;
      this.setState({
        expirationDate,
        message,
        active: false,
      })
    })
    .catch((err) => {
      this.setState({
        message: 'It looks like the encrypted message has expired, sorry about that',
      })
    })
  }

  close = [
    { label: "CLOSE", onClick: this.handleToggle.bind(this) },
  ]

  inputIncomplete() {
    if (!this.state.inputComplete) {
      return (
        <div>
          <Dialog
            actions={this.close}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='Incomplete Fields'
          >
            <p>Oops! Looks like you forgot to fill in some relevant information. Please make sure you've filled in all the relevant fields</p>
          </Dialog>
        </div>
      )
    }
  }

  handleEncryption(event) {
    event.preventDefault();
    const { message, expirationTime, expirationDate, hash, name } = this.state
    if (!message.length || !expirationTime || !name.length) {
      this.setState({
        active: true,
         inputComplete: false,
      })
    } else {
      fetch('/api/encrypt/' + hash , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          expirationTime: expirationTime,
          expirationDate: expirationDate,
        })
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ encrypted: res });
        this.handleToggle();
      })
      .catch((err) => {
        console.error('here is the error encrypting: ', err);
      });
    }
  }

  actions = [
      { label: "CLOSE", onClick: this.handleToggle.bind(this) },
      { label: "DECRYPT", onClick: this.handleDecryption.bind(this) },
    ];

  renderEncryption() {
    if (this.state.encrypted.length && this.state.message.length) {
      return (
        <div>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='De/Encrypt'
          >
            <Input
              required='true'
              type='text'
              name='encrypted'
              multiline label='Message'
              value={this.state.encrypted}
              onChange={this.handleChange.bind(this, 'encrypted')}
            />
          </Dialog>
        </div>
      )
    } else if (this.state.inputComplete) {
      return (
        <div>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='De/Encrypt'
          >
            <Input
              required='true'
              type='text'
              name='message'
              multiline label='Message'
              value={this.state.message}
              onChange={this.handleChange.bind(this, 'message')}
            />
          </Dialog>
        </div>
      )
    }
  }

  render() {
    let { visibility, message, hash, expirationDate, currentDate } = this.state;
    return (
      <div className="container-fluid">
        <form onSubmit={this.handleEncryption.bind(this)}>
          <div className="row">
            <div className="offset-xs-4">
              <Card
                style={{width: '350px'}}
              >
                <CardTitle
                  title="Tovia's Enigma"
                />
                <div className="row name-row">
                  <div className="col-xs-2">
                    <Avatar>
                      <img src="https://www.random.org/analysis/randbitmap-rdo.png" alt="https://www.random.org/analysis/randbitmap-rdo.png" className="image-icon" />
                    </Avatar>
                  </div>
                  <div className="col-xs-9 name-container">
                    <section>
                      <Input
                        required='true'
                        type='text'
                        label='Name'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange.bind(this, 'name')}
                      />
                    </section>
                  </div>
                </div>
                <div className="row message-row">
                  <section>
                    <Input
                      required='true'
                      type='text'
                      name='message'
                      multiline label='Message'
                      maxLength={120}
                      value={this.state.message}
                      onChange={this.handleChange.bind(this, 'message')}
                    />
                  </section>
                </div>
                <div className="row expiration-row">
                  <section>
                    <DatePicker
                      minDate={currentDate}
                      name='expirationDate'
                      label='Expiration date *'
                      sundayFirstDayOfWeek
                      onChange={this.handleChange.bind(this, 'expirationDate')}
                      value={this.state.expirationDate}
                    />
                  </section>
                </div>
                <CardActions theme={theme}>
                  <Button
                    label="ENCRYPT"
                    className="button"
                    onClick={this.handleEncryption}
                  />
                  <Button
                    label="DECRYPT"
                    className="button"
                    onClick={this.handleToggle}
                  />
                </CardActions>
                { this.inputIncomplete() }
                { this.renderEncryption() }
              </Card>
            </div>
          </div>
        </form>
        <br />
        <div className="offset-xs-5 offset-lg-4">
          <Passphrase
            hash={hash}
            createSalt={this.createSalt.bind(this)}
          />
        </div>
      </div>
    )
  }
}
