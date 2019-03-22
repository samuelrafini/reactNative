import React, { Component } from 'react';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';
import { View, StyleSheet } from 'react-native';
import BackgroundWaves from '../BackgroundWaves';


class LoginForm extends Component {

    state = {
        isSignInFront: true,
    }

    setFront() {        
        return this.setState({
            isSignInFront: !this.state.isSignInFront,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <UserSignUp
                    setFront={this.setFront.bind(this)}
                    isSignInFront={this.state.isSignInFront}
                />
                <UserLogin
                    setFront={this.setFront.bind(this)}
                    isSignInFront={this.state.isSignInFront}
                />

                <BackgroundWaves />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

export default LoginForm