import React, { useCallback, useImperativeHandle } from 'react';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 300;

export interface BottomSheetRef {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
}

interface BottomSheetProps {
    children?: React.ReactNode;
}

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
    ({ children }, ref) => {
        const translateY = useSharedValue(0);
        const active = useSharedValue(false);

        const scrollTo = useCallback((destination: number) => {
            active.value = destination !== 0;
            translateY.value = withSpring(destination, { damping: 50 });
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
                translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            })
            .onEnd(() => {
                if (translateY.value > -SCREEN_HEIGHT / 3) {
                    scrollTo(0);
                } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                    scrollTo(MAX_TRANSLATE_Y);
                }
            });

        const rBottomSheetStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value }],
            };
        });

        const rBackdropStyle = useAnimatedStyle(() => {
            return {
                opacity: withSpring(active.value ? 1 : 0),
                pointerEvents: active.value ? 'auto' : 'none',
            };
        });

        return (
            <>
                <Animated.View
                    style={[styles.backdrop, rBackdropStyle]}
                    onTouchStart={() => scrollTo(0)}
                />
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                        <View style={styles.line} />
                        {children}
                    </Animated.View>
                </GestureDetector>
            </>
        );
    }
);

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        zIndex: 1000,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#E9ECEF',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999,
    },
});

export default BottomSheet;
