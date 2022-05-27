/**
 * @format
 */

import {View} from 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  const utils = render(<App />);
});
