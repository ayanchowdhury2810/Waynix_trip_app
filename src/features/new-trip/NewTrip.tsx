import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../shared/components/CommonHeader';

const NewTrip = () => {
    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader />
            <View style={styles.content}>
                <Text>New Trip Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default NewTrip;

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