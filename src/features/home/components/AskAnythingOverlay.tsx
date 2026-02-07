import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const AskAnythingOverlay = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.absoluteContainer}>
            <BlurView intensity={500} tint="light" style={[styles.blurContainer, { paddingBottom: insets.bottom }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.pill,
                        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
                    ]}
                >
                    <Text style={styles.placeholder}>Ask anything about this breakfast…</Text>
                    <View style={styles.iconContainer}>
                        <Ionicons name="sparkles" size={16} color="#4A4A68" />
                    </View>
                </Pressable>
            </BlurView>
        </View>
    );
};

export default AskAnythingOverlay;

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90, // Reduced height
    },
    blurContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pill: {
        width: width * 0.92,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

        // Premium shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 10,
    },
    placeholder: {
        fontSize: 16,
        color: '#8E8EA9',
        fontWeight: '400',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
