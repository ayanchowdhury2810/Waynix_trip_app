import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../../shared/components/CommonHeader';
import ScheduleItem from '../components/ScheduleItem';

const SCHEDULE_DATA = [
    { id: '1', time: '9:30am - 10:30am', label: 'Breakfast' },
    { id: '2', time: '9am - 1pm', label: 'Activity 1' },
    { id: '3', time: '9:30am - 10:30am', label: 'Lunch' },
    { id: '4', time: '9:30am - 10:30am', label: 'Breakfast' }, // Added to show scrolling
];

const Homescreen = () => {
    const [selectedId, setSelectedId] = useState<string | null>(SCHEDULE_DATA[0].id);

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader />
            <View style={styles.listContainer}>
                <FlatList
                    data={SCHEDULE_DATA}
                    renderItem={({ item }) => (
                        <ScheduleItem
                            time={item.time}
                            label={item.label}
                            isSelected={item.id === selectedId}
                            onPress={() => setSelectedId(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>
            <View style={styles.content}>
                <Text>Home Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default Homescreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        marginTop: 20,
    },
    listContent: {
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});