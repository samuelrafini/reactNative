import React, { Component } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient, } from 'expo';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

class BackgroundWaves extends Component {

    constructor() {
        super()
        this.spinValue = new Animated.Value(0);
        this.spinValue2 = new Animated.Value(0);
        this.spinValue3 = new Animated.Value(0);


        Animated.parallel(
            [
                Animated.loop(
                    Animated.timing(this.spinValue, {
                        toValue: 1,
                        duration: 70000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    })
                ),
                Animated.loop(
                    Animated.timing(this.spinValue2, {
                        toValue: 1,
                        duration: 60000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    })
                ),
                Animated.loop(
                    Animated.timing(this.spinValue3, {
                        toValue: 1,
                        duration: 50000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    })
                )
            ]).start();
    }

    spin(waveNumber) {
        const spin = waveNumber === 1 ? this.spinValue : waveNumber === 2 ? this.spinValue2 : this.spinValue3
        return spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    }
    render() {
        return (
            <LinearGradient colors={['#89253e', '#2c2c54']}>
                <View style={styles.container}>
                    <Animated.View style={{ ...styles.wave1, transform: [{ rotate: this.spin(1) }] }} />
                    <Animated.View style={{ ...styles.wave2, transform: [{ rotate: this.spin(2) }] }} />
                    <Animated.View style={{ ...styles.wave3, transform: [{ rotate: this.spin(3) }] }} />
                </View>
            </LinearGradient>

        );
    };
};

const styles = {
    container: {
        position: 'relative',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        overflow: 'hidden'
    },
    wave1: {
        position: 'absolute',
        width: SCREEN_WIDTH * 5,
        height: SCREEN_WIDTH * 5,
        backgroundColor: 'rgba(64, 64, 122, 0.6)',
        borderRadius: 810,
        top: SCREEN_HEIGHT - 500,
    },
    wave2: {
        position: 'absolute',
        width: SCREEN_WIDTH * 5,
        height: SCREEN_WIDTH * 5,
        backgroundColor: 'rgba(137, 37, 62, 0.6)',
        borderRadius: 810,
        top: SCREEN_HEIGHT - 500,
    },
    wave3: {
        position: 'absolute',
        width: SCREEN_WIDTH * 5,
        height: SCREEN_WIDTH * 5,
        backgroundColor: 'rgba(112, 111, 211, 0.4)',
        borderRadius: 810,
        top: SCREEN_HEIGHT - 500,
    }
}
export default BackgroundWaves;
