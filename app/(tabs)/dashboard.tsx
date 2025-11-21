import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BotStatus } from "./components/BotStatus";
import { CameraFeed } from "./components/CameraFeed";
import { CropGridHeatmap } from "./components/CropGridHeatmap";
import { WaterLevel } from "./components/WaterLevel";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState({
    waterLevel: 78,
    battery: 85,
  });

  const [isActive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample crop grid data
  const temperatures = [
    [22, 24, 26, 28, 30],
    [21, 23, 25, 27, 29],
    [20, 22, 24, 26, 28],
  ];
  const moistures = [
    [35, 45, 50, 60, 70],
    [40, 50, 55, 65, 75],
    [30, 40, 45, 55, 65],
  ];
  const phValues = [
    [6.5, 6.8, 7.0, 7.2, 7.5],
    [6.2, 6.5, 6.8, 7.0, 7.3],
    [6.0, 6.3, 6.5, 6.8, 7.0],
  ];
  const lastChecked = [
    [5, 10, 15, null, 2],
    [3, 8, 12, 20, null],
    [null, 5, 10, 15, 25],
  ];

  // Simulate sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        waterLevel: Math.max(
          10,
          Math.min(100, prev.waterLevel + (Math.random() - 0.5) * 2)
        ),
        battery: Math.max(
          5,
          Math.min(100, prev.battery + (Math.random() - 0.5) * 0.5)
        ),
      }));
      setCurrentTime(new Date()); // update time on every sensor update
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Camera Feed */}
      <CameraFeed />

      {/* Sensor Cards stacked in column */}
      <View style={styles.sensorColumn}>
        <WaterLevel waterLevel={sensorData.waterLevel} />

        <BotStatus
          isActive={isActive}
          temperature={25}
          uptime="2h"
          connectionQuality={90}
          batteryPercentage={sensorData.battery}
        />
      </View>

      {/* Heatmap */}
      <CropGridHeatmap
        temperatures={temperatures}
        moistures={moistures}
        phValues={phValues}
        lastChecked={lastChecked}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcfce7", // green-50
    padding: 16,
  },
  sensorColumn: {
    flexDirection: "column",
    marginTop: 16,
    gap: 16, // space between WaterLevel and BotStatus
  },
});
