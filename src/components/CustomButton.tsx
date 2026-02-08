import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    isLoading?: boolean;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    isLoading,
    disabled
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || isLoading}
            style={({ pressed }) => [
                styles.button,
                style,
                (disabled || isLoading) && styles.disabled,
                pressed && styles.pressed
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={Colors.white} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </Pressable>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    text: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    pressed: {
        opacity: 0.8,
    },
    disabled: {
        backgroundColor: Colors.greyLighter,
    }
});
