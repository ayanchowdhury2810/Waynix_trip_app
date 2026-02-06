import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface TagProps {
    label: string;
}

const Tag = ({ label }: TagProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

export default Tag;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFE5E5',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#FFb6c1',
    },
    text: {
        color: '#D64045',
        fontSize: 12,
        lineHeight: 15,
    },
});
