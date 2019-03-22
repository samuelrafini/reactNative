import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()

    this.loadApp()
  }


  loadApp = () => {
    const user = AsyncStorage.getItem('user').then(() => console.log('check if user exist asyncStorage in HomeScreen: ', user));
    
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
      </View>
    )
  }
}
