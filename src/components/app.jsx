import Avatar from 'react-toolbox/lib/avatar';
import axios from 'axios';
import { Button } from 'react-toolbox/lib/button';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import React, { Component } from 'react';
import theme from 'react-toolbox/lib/card/theme.css';
import Calendar from './calendar';
import Message from './message';
import Name from './name';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleEncryption = this.handleEncryption.bind(this);
    this.handleDecryption = this.handleDecryption.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderEncryption = this.renderEncryption.bind(this);
    this.inputIncomplete = this.inputIncomplete.bind(this);
  }

  componentDidMount() {
    this.createSalt();
    if (window.location.pathname !== '/' ) {
      let pathname = window.location.pathname.substring(1);
      this.setState({ hash: pathname })
    }
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

  createSalt() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ hash: text });
  }

  handleDecryption() {
    const { hash, encrypted } = this.state;
    axios.get('/api/encrypt/' + hash, {
      params: {
        message: encrypted
      }
    })
    .then((res) => {
      let { name, message, expirationDate } = res.data;
      expirationDate = new Date(expirationDate);
      this.setState({
        expirationDate,
        message,
        name,
        active: false,
      })
    })
    .catch((err) => {
      this.setState({
        message: 'It looks like the encrypted message has expired, sorry about that',
      })
    })
  }

  // close is the button on the invalid input modal
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
          name: name,
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

  //actions are the buttons on the De/Encrypt Modal
  actions = [
      { label: "CLOSE", onClick: this.handleToggle.bind(this) },
      { label: "DECRYPT", onClick: this.handleDecryption.bind(this) },
    ];

  renderEncryption() {
    let { active, encrypted, message, inputComplete } = this.state;
    if (encrypted.length && message.length) {
      return (
        <div>
          <Dialog
            actions={this.actions}
            active={active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='De/Encrypt'
          >
            <Input
              required
              type='text'
              name='encrypted'
              multiline label='Message'
              value={encrypted}
              onChange={this.handleChange.bind(this, 'encrypted')}
            />
          </Dialog>
        </div>
      )
    } else if (inputComplete) {
      return (
        <div>
          <Dialog
            actions={this.actions}
            active={active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='De/Encrypt'
          >
            <Input
              required
              type='text'
              name='encrypted'
              multiline label='Message'
              value={encrypted}
              onChange={this.handleChange.bind(this, 'encrypted')}
            />
          </Dialog>
        </div>
      )
    }
  }

  render() {
    let { visibility, message, hash, expirationDate, currentDate, name } = this.state;
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
                    <Name
                      handleChange={this.handleChange.bind(this)}
                      name={name}
                    />
                  </div>
                </div>
                <div className="row message-row">
                 <Message
                   handleChange={this.handleChange.bind(this)}
                   message={message}
                 />
                </div>
                <div className="row expiration-row">
                  <Calendar
                    currentDate={currentDate}
                    handleChange={this.handleChange.bind(this)}
                    expirationDate={expirationDate}
                  />
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
