import React from 'react';
import { shallow } from 'enzyme';
import Message from '../components/message';

test('Message renders correctly', () => {
  const component = shallow(<Message />);
  expect(component).toMatchSnapshot();
})
