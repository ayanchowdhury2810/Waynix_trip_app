import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/src/shared/components/HapticTab';
import { IconSymbol } from '@/src/shared/components/IconSymbol';
import { useColorScheme } from '@/src/shared/hooks/use-color-scheme';

import HomeScreen from '@/src/features/home/HomeScreen';
import MyTrips from '@/src/features/my-trips/MyTrips';
import NewTrip from '@/src/features/new-trip/NewTrip';
import ProfileScreen from '@/src/features/profile/Profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'white',
        }
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tab.Screen
        name="my-trips"
        component={MyTrips}
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.walk" color={color} />,
        }}
      />

      <Tab.Screen
        name="new-trip"
        component={NewTrip}
        options={{
          title: 'New Trip',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
