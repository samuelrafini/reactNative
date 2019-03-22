import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LoginForm from '../components/loginForm';
import { connect } from 'react-redux';

class AuthScreen extends Component {

    componentDidMount() {
        this.onAuthComplete(this.props);
    }

    onAuthComplete(props) {
        if (props.user) {
            this.props.navigation.navigate('Main');
        }
    }

    componentDidUpdate() {
        this.onAuthComplete(this.props)
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginForm />
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

const mapStateToProps = ({ auth }) => {
    return { user: auth.user }
}

export default connect(mapStateToProps)(AuthScreen);