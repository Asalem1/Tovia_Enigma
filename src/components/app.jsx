import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import Ripple from 'react-toolbox/lib/ripple';
import Modal from  'react-modal';
import React, { Component } from 'react';
import theme from 'react-toolbox/lib/ripple/theme.css';
import Passphrase from './passphrase';

const Link = (props) => (
  <a {...props} style={{position: 'relative'}}>
    {props.children}
  </a>
);

const RippleLink = Ripple({spread: 3})(Link);

const customStyles = {
  content : {
    top: '50%',
    left: '71%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    minWidth: '60%',
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      name: '',
      currentDate: new Date(),
      expirationDate: '', //sets the date
      expirationTime: 0, //sets a numerical date value
      hash: '',
      pathName: '',
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  componentDidMount() {
    this.createSalt();
    this.setState({ pathName: window.location.pathname })
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
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
    event.preventDefault();
    fetch('/#' + hash)
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
      this.setState({
        message: res,
       })
    })
    .catch((err) => {
      console.error('here is the error encrypting: ', err);
    });
  }

  render() {
    let { visibility, message, hash, expirationDate, currentDate } = this.state;
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
                <br />
                <div>
                  <RippleLink
                    theme={theme}
                  >
                    <button
                      onClick={this.handleEncryption}
                    >
                      ENCRYPT
                    </button>
                  </RippleLink>
                  <RippleLink
                    theme={theme}
                  >
                    <button
                      onClick={this.handleEncryption}
                    >
                      DECRYPT
                    </button>
                  </RippleLink>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row passphrase-component">
          <Passphrase
            hash={hash}
            createSalt={this.createSalt.bind(this)}
          />
        </div>
      </div>
    )
  }
}
      /*

                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                  >
                    <Calendar closeModal={this.closeModal} />
                  </Modal>
      */
