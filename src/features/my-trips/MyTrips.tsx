import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/CommonHeader';

const MyTrips = () => {
    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader />
            <View style={styles.content}>
                <Text>My Trips Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default MyTrips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});