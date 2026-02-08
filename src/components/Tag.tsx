import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

interface TagProps {
    label: string;
    variant?: 'primary' | 'secondary';
}

const Tag = ({ label, variant = 'primary' }: TagProps) => {
    return (
        <View style={[
            styles.container,
            variant === 'secondary' && styles.secondaryContainer
        ]}>
            <Text style={[
                styles.text,
                variant === 'secondary' && styles.secondaryText
            ]}>
                {label}
            </Text>
        </View>
    );
};

export default Tag;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.pinkLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.pinkBorder,
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
    },
    text: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '400',
    },
    secondaryText: {
        fontWeight: '400',
    },
});
