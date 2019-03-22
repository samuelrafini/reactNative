import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Text, Input, Button } from 'react-native-elements';

import { emailChanged, passwordChanged, loginUser } from '../../Actions/';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class UserLogin extends Component {

    constructor(props) {
        super(props)

        this.moveAnimationValue = new Animated.ValueXY({ x: 0, y: 0 })
        this.scaleAnimationValue = new Animated.Value(100)
        this.colorAnimationValue = new Animated.Value(100)
        this.zIndexAnimationValue = new Animated.Value(2)


        this.interpolateScale = this.scaleAnimationValue.interpolate({
            inputRange: [0, 100],
            outputRange: [SCREEN_WIDTH * 0.75, SCREEN_WIDTH * 0.8]
        });

        this.interpolateColor = this.colorAnimationValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['#2c2c54', '#1f1f3d']
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.isSignInFront !== prevProps.isSignInFront) {
            if (!this.props.isSignInFront) {
                this.moveBackAnimation();
            } else {
                this.moveFrontAnimation();
            }
        }
    }

    moveFrontAnimation() {
        Animated.sequence([
            Animated.timing(this.moveAnimationValue, {
                toValue: { x: 0, y: 250 },
                duration: 500,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.parallel([
                Animated.spring(this.scaleAnimationValue, {
                    toValue: 100,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.spring(this.colorAnimationValue, {
                    toValue: 100,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(this.zIndexAnimationValue, {
                    toValue: 2,
                    duration: 50
                }),
                Animated.timing(this.moveAnimationValue, {
                    toValue: { x: 0, y: 0 },
                    duration: 500,
                    easing: Easing.inOut(Easing.ease)
                })
            ])
        ]).start();
    }

    moveBackAnimation() {
        Animated.sequence([
            Animated.timing(this.moveAnimationValue, {
                toValue: { x: 0, y: -200 },
                duration: 500,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.parallel([
                Animated.spring(this.scaleAnimationValue, {
                    toValue: 0,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.spring(this.colorAnimationValue, {
                    toValue: 0,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(this.zIndexAnimationValue, {
                    toValue: 1,
                    duration: 50
                }),
                Animated.timing(this.moveAnimationValue, {
                    toValue: { x: 0, y: 0 },
                    duration: 500,
                    easing: Easing.inOut(Easing.ease)
                })
            ])
        ]).start();
    }

    showFront(link) {
        if (!this.props.isSignInFront) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.props.setFront}
                >
                    <Text style={link}> Already have an account? Sign in! </Text>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderRepeatPassword(input, inputFontSize, inputContainerStyle) {
        if (!this.props.isSignInFront) {
            return (
                <Input
                    shake
                    containerStyle={input}
                    inputStyle={inputFontSize}
                    inputContainerStyle={inputContainerStyle}
                    placeholder='Repeat Password'
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                />
            )
        }
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }


    render() {

        const animatedStyle = {
            transform: [{ translateY: this.moveAnimationValue.y }],
            backgroundColor: this.interpolateColor,
            width: this.interpolateScale,
            zIndex: this.zIndexAnimationValue
        }

        const { container, title, error, input, button, buttonStyle, buttonTitle, inputFontSize, inputContainerStyle, link } = styles
        return (
            <Animated.View style={[container, animatedStyle]}>
                { this.props.error ? <Text h5 style={error}> {this.props.error} </Text> : <Text h3 style={title}> Sign In </Text>}
                <Input
                    shake
                    containerStyle={input}
                    inputStyle={inputFontSize}
                    placeholder='Email'
                    inputContainerStyle={inputContainerStyle}
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                />
                <Input
                    secureTextEntry
                    shake
                    containerStyle={input}
                    inputStyle={inputFontSize}
                    placeholder='Password'
                    inputContainerStyle={inputContainerStyle}
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                />

                {this.renderRepeatPassword(input, inputFontSize, inputContainerStyle)}

                <Button
                    titleStyle={buttonTitle}
                    raised={true}
                    buttonStyle={buttonStyle}
                    containerStyle={button}
                    title="Login"
                    onPress={this.onButtonPress.bind(this)}
                    loading={this.props.loading}
                />

                {this.showFront(link)}

            </Animated.View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#1f1f3d',
        width: SCREEN_WIDTH * 0.8,
        borderRadius: 5,
        shadowOpacity: 0.3,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 5,
        elevation: 10,
        top: SCREEN_HEIGHT * 0.25,
    },

    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        color: '#dadaea'
    },
    error: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        color: '#89253e'
    },
    input: {
        alignSelf: 'center',
        marginTop: 20,
        width: SCREEN_WIDTH * 0.7,
        backgroundColor: 'rgba(57, 57, 79, 0.2)',
    },
    inputContainerStyle: {
        borderBottomWidth: 0
    },
    inputFontSize: {
        fontSize: 14,
        color: '#dadaea',
    },
    button: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
        width: 250,
    },
    buttonStyle: {
        borderRadius: 100,
        backgroundColor: '#89253e',
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    link: {
        paddingTop: 5,
        paddingBottom: 5,
        color: 'white',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14

    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
}

export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(UserLogin);



