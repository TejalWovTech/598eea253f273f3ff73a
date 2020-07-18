import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CountryInfo from './CountryInfo';
import Details from './Details';
const NaviApp = createStackNavigator(
  {
    CountryInfo: CountryInfo,
    Details: Details,
  },
  {
    initialRouteName: 'CountryInfo',
  },
);
export default createAppContainer(NaviApp);
