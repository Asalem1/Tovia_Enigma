import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

export default class Message extends Component {
    constructor(props) {
      super(props);
      this.state =  {
        message: '',
      }
    }

    handleChange(name, value) {
     this.setState({[name]: value });
    };

    render () {
      return (
        <section>
          <Input type='text' name="message" multiline label='Message *' maxLength={120} value={this.state.message} onChange={this.handleChange.bind(this, 'message')} />
        </section>
      );
    }
  }
//  constructor(props) {
//     super(props);
//     this.state = {
//       height: 30,
//       value: '',
//       visibility: 'hidden',
//     };
//     this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
//     this.toggleVisibility = this.toggleVisibility.bind(this);
//     this.toggleChange = this.toggleChange.bind(this);
//   }

//   componentDidMount() {
//     this.mounted = true;
//     this.setFilledTextareaHeight();
//   }

//   componentDidUpdate() {
//     if (this.props.encrypted) {
//       this.refs.message.value = this.props.value;
//     }
//   }

//   setFilledTextareaHeight() {
//     if (this.mounted) {
//       const element = this.ghost;
//       this.setState({ height: element.clientHeight });
//     }
//   }

//   toggleVisibility() {
//     this.setState({ visibility: 'visible' });
//   }

//   toggleChange(event) {
//     this.props.setMessageValue(event);
//     const { value } = this.refs.message;
//     this.setState({ value })
//   }

//   getExpandableField() {
//     const visibility = {
//       visibility: this.state.visibility,
//       transition: '0.1s ease',
//       color: '#7581c9',
//       fontSize: '12px',
//     }
//     const asteriks = {
//       color: 'red',
//       fontSize: '12px',
//     }
//     const isOneLine = this.state.height <= 30;
//     let { height, value } = this.state;
//     return (
//       <div>
//         <label style={visibility} className="message-label" htmlFor="message">Message <i className="asteriks" style={asteriks}>*</i></label>
//         <textarea
//           className="message-textarea"
//           name="message"
//           defaultValue={value}
//           maxLength="120"
//           style={{
//             height,
//             resize: isOneLine ? "none" : null
//           }}
//           ref="message"
//           onChange={this.toggleChange}
//           onKeyUp={this.setFilledTextareaHeight}
//           placeholder='Message *'
//           onClick={this.toggleVisibility}
//         />
//         <div className="word-limit">
//           <p>{this.wordCount()}{"/120"}</p>
//         </div>
//       </div>
//     );
//   }

//   getGhostField() {
//     return (
//       <div
//         className="message-textarea message-ghost"
//         ref={(c) => {
//           this.ghost = c
//           }
//         }
//         aria-hidden="true"
//       >
//         {this.state.value}
//       </div>
//     );
//   }

//   wordCount() {
//     const charCount = this.state.value.split('').length;
//     return charCount;
//   }

//   render() {
//     return (
//       <div className="container message-container">
//         {this.getExpandableField()}
//         {this.getGhostField()}
//       </div>
//     );
//   }
// }
