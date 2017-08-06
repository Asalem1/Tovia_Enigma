import Avatar from 'react-toolbox/lib/avatar';
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
      currentDate: new Date(),
      expirationDate: '', //sets the date
      expirationTime: 0, //sets a numerical date value
      hash: '',
      pathName: '',
      encrypted: '',
    }
    this.handleEncryption = this.handleEncryption.bind(this);
    this.handleDecryption = this.handleDecryption.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderEncryption = this.renderEncryption.bind(this);
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
    this.setState({active: !this.state.active});
  }

  componentDidMount() {
    this.createSalt();
    this.setState({ pathName: window.location.pathname })
  }

  createSalt() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ hash: text });
  }

  handleDecryption(event) {
    // event.preventDefault();
    alert('decrypt is triggered: ');
    fetch('/' + hash)
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the res in decrypt: ', res)
      setState({ active: false });
    })
    .catch((err) => {
      console.error('here is the error decrypting: ', err);
    });
  }

  handleEncryption(event) {
    event.preventDefault();
    const { message, expirationTime, expirationDate, hash } = this.state
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

  actions = [
      { label: "CLOSE", onClick: this.handleToggle.bind(this) },
      { label: "DECRYPT", onClick: this.handleDecryption.bind(this) },
    ];

  renderEncryption() {
    if (this.state.encrypted.length) {
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
              type='text'
              name='encrypted'
              multiline label='Message *'
              value={this.state.encrypted}
              onChange={this.handleChange.bind(this, 'encrypted')}
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
                        type='text'
                        label='Name *'
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
                      type='text'
                      name='message'
                      multiline label='Message *'
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
                      label='Expiration date*'
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
