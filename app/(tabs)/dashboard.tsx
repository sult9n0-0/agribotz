import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Placeholder components (replace with real ones later)
const CameraPreview = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-green-200 h-48 rounded-lg justify-center items-center mb-4"
  >
    <Text className="text-green-900 font-bold">Camera Feed (Tap to open)</Text>
  </TouchableOpacity>
);

const WaterLevel = ({ percentage }: { percentage: number }) => (
  <View className="bg-white p-4 rounded-lg shadow mb-4">
    <Text className="text-gray-700 font-semibold mb-1">Water Level</Text>
    <Text className="text-green-800 font-bold text-lg">{percentage}%</Text>
  </View>
);

const BotStatus = ({
  isActive,
  batteryPercentage,
}: {
  isActive: boolean;
  batteryPercentage: number;
}) => (
  <View className="bg-white p-4 rounded-lg shadow mb-4">
    <Text className="text-gray-700 font-semibold mb-1">Bot Status</Text>
    <Text className="text-green-800 font-bold">{isActive ? "Online" : "Offline"}</Text>
    <Text className="text-gray-600 mt-1">Battery: {batteryPercentage}%</Text>
  </View>
);

const GeoFence = ({ distance, maxDistance }: { distance: number; maxDistance: number }) => (
  <View className="bg-white p-4 rounded-lg shadow mb-4">
    <Text className="text-gray-700 font-semibold mb-1">Geofence</Text>
    <Text className="text-green-800 font-bold">
      {distance} / {maxDistance} meters
    </Text>
  </View>
);

const CropHeatmap = ({ temperatures }: { temperatures: number[][] }) => (
  <View className="bg-white p-4 rounded-lg shadow mb-4">
    <Text className="text-gray-700 font-semibold mb-2">Crop Heatmap (Temp °C)</Text>
    {temperatures.map((row, i) => (
      <View key={i} className="flex-row mb-1">
        {row.map((cell, j) => (
          <View
            key={j}
            className="w-10 h-10 rounded mr-1 justify-center items-center"
            style={{ backgroundColor: `rgba(46,125,50,${cell / 40})` }}
          >
            <Text className="text-white text-xs">{Math.round(cell)}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

export default function Dashboard() {
  const router = useRouter();

  // Simulated sensor data
  const [sensorData, setSensorData] = useState({
    waterLevel: 78,
    battery: 85,
    distance: 24,
  });

  const [heatmapData, setHeatmapData] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(null).map(() => 15 + Math.random() * 20))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        waterLevel: Math.min(100, Math.max(0, prev.waterLevel + (Math.random() - 0.5) * 2)),
        battery: Math.min(100, Math.max(0, prev.battery + (Math.random() - 0.5) * 0.5)),
        distance: Math.min(50, Math.max(0, prev.distance + (Math.random() - 0.5) * 0.8)),
      }));
      setHeatmapData((prev) =>
        prev.map((row) => row.map((temp) => Math.min(40, Math.max(10, temp + (Math.random() - 0.5) * 1.5))))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className="flex-1 bg-green-50 p-4">
      <Text className="text-3xl font-bold text-green-900 mb-4">Dashboard</Text>
      <Text className="text-gray-600 mb-6">
        Real-time monitoring of your Agribotz system
      </Text>

      {/* Camera */}
      <CameraPreview onPress={() => router.push("/camera")} />

      {/* Quick Stats */}
      <View className="flex-row space-x-4 mb-4">
        <WaterLevel percentage={sensorData.waterLevel} />
        <BotStatus isActive={true} batteryPercentage={sensorData.battery} />
      </View>

      {/* Geofence */}
      <GeoFence distance={sensorData.distance} maxDistance={50} />

      {/* Heatmap */}
      <CropHeatmap temperatures={heatmapData} />

      {/* System Info */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-gray-700 font-semibold mb-2">System Information</Text>
        <Text className="text-gray-900 mb-1">Device ID: AGRIBOT-2024-001</Text>
        <Text className="text-gray-900 mb-1">Firmware: v2.1.0</Text>
        <Text className="text-gray-900 mb-1">Location: Field Zone A</Text>
        <Text className="text-gray-900 mb-1">Last Update: 2m ago</Text>
      </View>
    </ScrollView>
  );
}
