import { Tabs } from 'expo-router';
import { Circle, Path, Svg } from 'react-native-svg';

// Custom Control Icon
const ControlIcon = ({ color }: { color: string }) => (
  <Svg viewBox="0 0 100 100" width={28} height={28}>
    <Circle cx="50" cy="50" r="40" fill={color} />
    <Path
      d="M50 30 L50 70 M30 50 L70 50"
      stroke="#fff"
      strokeWidth={6}
      strokeLinecap="round"
    />
  </Svg>
);

export default function ControlTabs() {
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
        name="controlHome"
        options={{
          title: 'Control Home',
          tabBarIcon: ({ color }) => <ControlIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="controlDashboard"
        options={{
          title: 'Control Dashboard',
          tabBarIcon: ({ color }) => <ControlIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="controlSettings"
        options={{
          title: 'Control Settings',
          tabBarIcon: ({ color }) => <ControlIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
