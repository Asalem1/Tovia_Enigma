import React, { Component } from 'react';

export default class Message extends Component {
 constructor(props) {
    super(props);
    this.state = {
      height: 30,
      value: this.props.value,
      visibility: 'hidden',
    };
    // this.setMessageValue = this.setMessageValue.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.setFilledTextareaHeight();
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost;
      this.setState({
        height: element.clientHeight,
      });
    }
  }

  toggleVisibility() {
    this.setState({ visibility: 'visible' });
  }

  componentDidUpdate() {
    const { value }= this.refs.message.value;
    console.log('this is the value: ', value)
    this.setState({ value });
    // if (!value.length) {
    //   this.setState({ visibility: 'hidden' })
    // }
  }

  getExpandableField() {
    const visibility = {
      visibility: this.state.visibility,
      transition: '0.1s ease',
      color: '#7581c9',
      fontSize: '12px',
    }
    const asteriks = {
      color: 'red',
      fontSize: '12px',
    }
    const isOneLine = this.state.height <= 30;
    let { height, value } = this.state;
    return (
      <div>
        <label style={visibility} className="message-label" htmlFor="message">Message <i className="asteriks" style={asteriks}>*</i></label>
        <textarea
          className="message-textarea"
          name="message"
          defaultValue={value}
          maxLength="120"
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          ref="message"
          onChange={this.props.setMessageValue}
          onKeyUp={this.setFilledTextareaHeight}
          placeholder='Message *'
          onClick={this.toggleVisibility}
        />
        <div className="word-limit">
          <p>{this.wordCount()}{"/120"}</p>
        </div>
      </div>
    );
  }

  getGhostField() {
    return (
      <div
        className="message-textarea message-ghost"
        ref={(c) => {
          this.ghost = c
          }
        }
        aria-hidden="true"
      >
        {this.state.value}
      </div>
    );
  }

  wordCount() {
    const charCount = this.state.value.split('').length;
    return charCount;
  }

  render() {
    return (
      <div className="container message-container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    );
  }
}
