import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('The App component', () => {
  test('renders', () => {
    const result = shallow(<App />);
    expect(result).toMatchSnapshot();
  });
});
