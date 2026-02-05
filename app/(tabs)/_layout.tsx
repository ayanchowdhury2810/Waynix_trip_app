import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/src/shared/components/HapticTab';
import { IconSymbol } from '@/src/shared/components/IconSymbol';
import { useColorScheme } from '@/src/shared/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'white',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-trips"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.walk" color={color} />,
        }}
      />

      <Tabs.Screen
        name="new-trip"
        options={{
          title: 'New Trip',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
