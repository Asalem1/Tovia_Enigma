import React, { Component } from 'react';

export default class Encryption extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  encrypt() {
    alert('this was called');
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4 col-md-4 col-lg-2">
        <button onClick={this.encrypt}>ENCRYPT</button>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-2">
        <button>DECRYPT</button>
        </div>
      </div>
    )
  }
}


  // initialize: function() {
  //   this.on('creating', this.hashPassword);
  // },
  // comparePassword: function(attemptedPassword, callback) {
  //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
  //     callback(isMatch);
  //   });
  // },
  // hashPassword: function() {
  //   var cipher = Promise.promisify(bcrypt.hash);
  //   return cipher(this.get('password'), null, null).bind(this)
  //     .then(function(hash) {
  //       this.set('password', hash);
  //     });
  // }
