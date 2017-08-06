import Input from 'react-toolbox/lib/input';
import Modal from  'react-modal';
import React, { Component } from 'react';
import Calendar from 'rc-calendar';
import Encryption from './encryption';
import Expiration from './expiration';
import Message from './message';
import Name from './name';
import Passphrase from './passphrase';


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
      expirationDate: '',
      expirationTime: 0,
      hash: '',
      encrypted: false,
      pathName: '',
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setExpiration = this.setExpiration.bind(this);
  }

  handleChange(name, value) {
    this.setState({[name]: value });
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

  setExpiration(event) {
    const expiration = event._d
    let exp = expiration.toString().split(' ').splice(1, 3);
    let newExp = [exp[1], exp[0], exp[2]].join(' ');
    this.closeModal();
    this.setState({
      expirationDate: newExp,
      expirationTime: expiration.valueOf(),
     })
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
        encrypted: true,
       })
    })
    .catch((err) => {
      console.error('here is the error encrypting: ', err);
    });
  }

  setMessageValue(event) {
    const { value } = event.target;
    this.setState({ message: value });
  }

  render() {
    let { visibility, message, encrypted, hash, expirationDate } = this.state;
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
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="calendar modal"
                  >
                    <Calendar
                      showDateInput={false}
                      showToday={false}
                      onSelect={this.setExpiration}
                    />
                  </Modal>
                  <Expiration
                    openModal={this.openModal}
                    expiration={expirationDate}
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
