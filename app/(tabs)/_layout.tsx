import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4ade80',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#fff', height: 80, paddingBottom: 10 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dashboard" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={28} color={color} />
          ),
        }}
      />
      {/* Control tab using FontAwesome gamepad */}
      <Tabs.Screen
        name="control" // make sure this matches your control.tsx route
        options={{
          title: 'Control',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gamepad" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
