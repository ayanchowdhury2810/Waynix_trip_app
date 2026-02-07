import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

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
        backgroundColor: '#FFE5E5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#FFb6c1',
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
    },
    text: {
        color: '#D64045',
        fontSize: 12,
        fontWeight: '600',
    },
    secondaryText: {
        fontWeight: '400',
    },
});
