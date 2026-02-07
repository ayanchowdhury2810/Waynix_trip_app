import React, { useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, Dimensions, Modal, StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
    Easing,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetRef {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
}

interface BottomSheetProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
    ({ children, style }, ref) => {
        const [isVisible, setIsVisible] = useState(false);
        const translateY = useSharedValue(0);
        const active = useSharedValue(false);

        const currentDestination = useSharedValue(0);

        const scrollTo = useCallback((destination: number) => {
            active.value = destination !== 0;
            currentDestination.value = destination;
            if (destination !== 0) {
                setIsVisible(true);
            }
            translateY.value = withTiming(
                destination,
                {
                    duration: 300,
                    easing: Easing.out(Easing.quad),
                },
                (finished) => {
                    if (finished && destination === 0) {
                        runOnJS(setIsVisible)(false);
                    }
                }
            );
        }, []);

        const isActive = useCallback(() => {
            return active.value;
        }, []);

        useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
            scrollTo,
            isActive,
        ]);

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event) => {
                translateY.value = event.translationY + context.value.y;
                // Clamp so it doesn't go higher than the target destination (which is negative)
                translateY.value = Math.max(translateY.value, currentDestination.value);
            })
            .onEnd(() => {
                // If dragged down more than 100 units from current active position, close it
                if (translateY.value > currentDestination.value + 100) {
                    scrollTo(0);
                } else {
                    // Snap back to destination
                    scrollTo(currentDestination.value);
                }
            });

        const rBottomSheetStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value }],
            };
        });

        const rBackdropStyle = useAnimatedStyle(() => {
            return {
                opacity: withTiming(active.value ? 1 : 0, { duration: 300 }),
            };
        });

        return (
            <Modal
                transparent
                visible={isVisible}
                animationType="none"
                onRequestClose={() => scrollTo(0)}
            >
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Animated.View
                        style={[styles.backdrop, rBackdropStyle]}
                        onTouchStart={() => scrollTo(0)}
                    />
                    <Animated.View style={[styles.bottomSheetContainer, style, rBottomSheetStyle]}>
                        <GestureDetector gesture={gesture}>
                            <View style={styles.handleArea}>
                                <View style={styles.line} />
                            </View>
                        </GestureDetector>
                        {children}
                    </Animated.View>
                </GestureHandlerRootView>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    bottomSheetContainer: {
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1000,
        overflow: 'hidden',
    },
    handleArea: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#E9ECEF',
        borderRadius: 2,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
});

export default BottomSheet;
