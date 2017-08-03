import React from 'react';
import { shallow } from 'enzyme';
import Input from '../components/input';

test('Input renders correctly', () => {
  const component = shallow(<Input />);
  expect(component).toMatchSnapshot();
})

test('Input should render the same encrypted message', () => {
  // const messageToEncrypt = 'this is a test';
  // component.find('message-input').simulate('change', { target: { value: messageToEncrypt }})
})
