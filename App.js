import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import firebase from 'firebase';

import store from './store'
import { Provider } from 'react-redux';

//screens
import AppNavigator from './navigation/AppNavigator';



export default class App extends React.Component {

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDXCgAWgLrmkdBiVmb324pAcNRs15oMQWg",
      authDomain: "waversapp-11870.firebaseapp.com",
      databaseURL: "https://waversapp-11870.firebaseio.com",
      projectId: "waversapp-11870",
      storageBucket: "waversapp-11870.appspot.com",
      messagingSenderId: "329254798477"
    };
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
