import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { func, string }  from 'prop-types';

export default class Message extends Component {
  render() {
    return (
      <section>
        <Input
          required
          type='text'
          name='message'
          multiline label='Message'
          maxLength={120}
          value={this.props.message}
          onChange={this.props.handleChange.bind(this, 'message')}
        />
      </section>
    )
  }
}

Message.propTypes = {
  handleChange: func.isRequired,
  message: string,
}
