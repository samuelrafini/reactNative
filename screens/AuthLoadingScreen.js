import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native';

class AuthLoadingScreen extends Component {

    constructor() {
        super()


    }

    loadApp = () => {
       const user = AsyncStorage.getItem('user').then(() => console.log('check if user exist asyncStorage in authLoading screen: ',user))
        this.props.navigation.navigate('auth')
    }

    componentDidMount = () => {
        this.loadApp()
    }

    // loadApp = async() => {
    //     const user = await AsyncStorage.getItem('user');
    //     console.log('check if user exist asyncStorage in authLoading screen: ',user)
    //     this.props.navigation.navigate(user ? 'Main' : 'auth');
    // }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default AuthLoadingScreen;