import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, repeatPasswordChanged, signUpUser } from '../../Actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class UserSignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            errMessageEmail: '',
            errMessagePassword: '',
        }

        this.moveAnimationValue = new Animated.ValueXY({ x: 0, y: 0 })
        this.scaleAnimationValue = new Animated.Value(0)
        this.colorAnimationValue = new Animated.Value(0)
        this.zIndexAnimationValue = new Animated.Value(1)


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
                this.moveFrontAnimation();
            } else {
                this.moveBackAnimation();
            }
        }
    }

    moveFrontAnimation() {
        Animated.sequence([
            Animated.timing(this.moveAnimationValue, {
                toValue: { x: 0, y: 250 },
                duration: 500
            }),
            Animated.parallel([
                Animated.spring(this.scaleAnimationValue, {
                    toValue: 100,
                }),
                Animated.spring(this.colorAnimationValue, {
                    toValue: 100,
                }),
                Animated.timing(this.zIndexAnimationValue, {
                    toValue: 2,
                    duration: 50
                }),
                Animated.timing(this.moveAnimationValue, {
                    toValue: { x: 0, y: 0 },
                    duration: 500
                })
            ])
        ]).start();
    }

    moveBackAnimation() {
        Animated.sequence([
            Animated.timing(this.moveAnimationValue, {
                toValue: { x: 0, y: -200 },
                duration: 500
            }),
            Animated.parallel([
                Animated.spring(this.scaleAnimationValue, {
                    toValue: 0,
                }),
                Animated.spring(this.colorAnimationValue, {
                    toValue: 0,
                }),
                Animated.timing(this.zIndexAnimationValue, {
                    toValue: 1,
                    duration: 50
                }),
                Animated.timing(this.moveAnimationValue, {
                    toValue: { x: 0, y: 0 },
                    duration: 500
                })
            ])
        ]).start();
    }


    showFront(link) {
        if (this.props.isSignInFront) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.props.setFront}
                >
                    <Text style={link}> Don't have an account? Sign up! </Text>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderRepeatPassword(input, inputFontSize, inputContainerStyle) {
        if (!this.props.isSignInFront) {
            return (
                <Input
                    secureTextEntry
                    shake
                    containerStyle={input}
                    inputStyle={inputFontSize}
                    inputContainerStyle={inputContainerStyle}
                    placeholder='Confirm Password'
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    onChangeText={this.onRepeatPasswordChange.bind(this)}
                    value={this.props.repeatPassword}
                    errorMessage={this.state.errMessagePassword}
                />
            )
        }
    }

    validateEmail() {

        if(this.props.email === '') {
            this.setState({ errMessageEmail: 'Please enter your email address.' });
            return false
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.props.email))) {
            this.setState({ errMessageEmail: 'You have entered an invalid email address!' });
            return false
        } else {
            return true
        }
    }

    checkPassword() {

        if( this.props.password === '') {
            this.setState({ errMessagePassword: 'Please enter your password'})
            return false
        }

        if( this.props.password.length < 6 ) {
            this.setState({ errMessagePassword: 'Password must be 6 characters.'})
            return false
        }

        if( this.props.password !== this.props.repeatPassword) {
            this.setState({ errMessagePassword: 'Password does not match.'})
            return false
        }

        

        return true
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
        this.setState({ errMessageEmail: ''})
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
        this.setState({ errMessagePassword: ''})
    }

    onRepeatPasswordChange(text) {
        this.props.repeatPasswordChanged(text)
        this.setState({ errMessagePassword: ''})
    }

    onButtonPress() {
        
        if( this.validateEmail() && this.checkPassword()){
            const { email, password } = this.props;
            this.props.signUpUser({ email, password });
        }
    }

    render() {

        const animatedStyle = {
            transform: [{ translateY: this.moveAnimationValue.y }],
            backgroundColor: this.interpolateColor,
            width: this.interpolateScale,
            zIndex: this.zIndexAnimationValue
        }
        const { container, title, input, button, buttonStyle, buttonTitle, inputFontSize, inputContainerStyle, link, error } = styles;

        return (
            <Animated.View style={[container, animatedStyle]}>
            { this.props.errorSignUp ? <Text h5 style={error}> {this.props.errorSignUp} </Text> : <Text h3 style={title}> Sign Up </Text>}
                <Input
                    shake
                    containerStyle={input}
                    inputStyle={inputFontSize}
                    placeholder='Email'
                    inputContainerStyle={inputContainerStyle}
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    errorMessage={this.state.errMessageEmail}
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
                    errorMessage={this.state.errMessagePassword}
                />

                {this.renderRepeatPassword(input, inputFontSize, inputContainerStyle)}

                <Button
                    titleStyle={buttonTitle}
                    raised={true}
                    buttonStyle={buttonStyle}
                    containerStyle={button}
                    title="Register"
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
        width: SCREEN_WIDTH * 0.75,
        borderRadius: 5,
        shadowOpacity: 0.2,
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
    },
});

const mapStateToProps = ({ auth }) => {
    const { email, password, repeatPassword, errorSignUp, loading } = auth;
    return { email, password, repeatPassword, errorSignUp, loading };
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, signUpUser, repeatPasswordChanged })(UserSignUp);


