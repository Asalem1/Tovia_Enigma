import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../components/calendar';

test('Calendar renders correctly', () => {
  const component = shallow(<Calendar />);
  expect(component).toMatchSnapshot();
})
