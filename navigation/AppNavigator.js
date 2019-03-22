import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthScreen from '../screens/AuthScreen';


export default createAppContainer(createSwitchNavigator({
  authLoading: AuthLoadingScreen,
  auth: AuthScreen,
  Main: MainTabNavigator,
}));