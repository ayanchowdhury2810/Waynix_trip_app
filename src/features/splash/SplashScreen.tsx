import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

const SplashScreen = () => {
    const router = useRouter();
    const opacity = useSharedValue(0);

    const navigateToHome = () => {
        router.replace('/(tabs)' as any);
    };

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 2000 }, (finished) => {
            if (finished) {
                opacity.value = withTiming(0, { duration: 500 }, (done) => {
                    if (done) runOnJS(navigateToHome)();
                });
            }
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, animatedStyle]}>
                <Text style={styles.title}>Waynix Trip App</Text>
            </Animated.View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
        letterSpacing: 1,
    },
});
