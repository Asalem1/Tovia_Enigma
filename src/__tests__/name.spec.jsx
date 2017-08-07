import React from 'react';
import { shallow } from 'enzyme';
import Name from '../components/name';

test('Name renders correctly', () => {
  const component = shallow(<Name />);
  expect(component).toMatchSnapshot();
})
