import React from 'react';
import { shallow } from 'enzyme';
import Passphrase from '../components/passphrase';

test('Input renders correctly', () => {
  const component = shallow(<Passphrase />);
  expect(component).toMatchSnapshot();
})
