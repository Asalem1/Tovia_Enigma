import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { func, string }  from 'prop-types';

export default class Name extends Component {
  render() {
    return (
      <section>
        <Input
          required
          type='text'
          label='Name'
          name='name'
          value={this.props.name}
          onChange={this.props.handleChange.bind(this, 'name')}
        />
      </section>
    )
  }
}

Name.propTypes = {
  handleChange: func.isRequired,
  name: string,
}
