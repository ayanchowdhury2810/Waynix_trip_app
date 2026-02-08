import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { ScheduleItemData } from '@/src/types/place';

interface ScheduleItemProps extends Omit<ScheduleItemData, 'id'> {
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1,
        minWidth: 100,
    },
    selectedContainer: {
        backgroundColor: Colors.pinkLight, // Light pink background
        borderColor: Colors.pinkBorder,   // Pinkish border
    },
    unselectedContainer: {
        backgroundColor: Colors.surface, // Light grey background
        borderColor: Colors.surface,
    },
    timeText: {
        fontSize: 12,
        marginBottom: 1,
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectedText: {
        color: Colors.primary, // Darker pink/red text
    },
    unselectedText: {
        color: Colors.grey, // Grey text
    },
});

export default React.memo(ScheduleItem);
