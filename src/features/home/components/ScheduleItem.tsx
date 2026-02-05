import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ScheduleItemProps {
    time: string;
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

const ScheduleItem = ({ time, label, isSelected, onPress }: ScheduleItemProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected ? styles.selectedContainer : styles.unselectedContainer,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.timeText,
                    isSelected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {time}
            </Text>
            <Text
                style={[
                    styles.labelText,
                    isSelected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1,
        minWidth: 100,
    },
    selectedContainer: {
        backgroundColor: '#FFE5E5', // Light pink background
        borderColor: '#FFb6c1',   // Pinkish border
    },
    unselectedContainer: {
        backgroundColor: '#F8F9FA', // Light grey background
        borderColor: '#F8F9FA',
    },
    timeText: {
        fontSize: 12,
        marginBottom: 4,
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectedText: {
        color: '#D64045', // Darker pink/red text
    },
    unselectedText: {
        color: '#6C757D', // Grey text
    },
});

export default ScheduleItem;
