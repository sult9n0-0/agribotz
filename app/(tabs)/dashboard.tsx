import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { BotStatus } from "./components/BotStatus";
import { WaterLevel } from "./components/WaterLevel";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState({
    waterLevel: 78,
    battery: 85,
  });

  const [isActive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        waterLevel: Math.max(10, Math.min(100, prev.waterLevel + (Math.random() - 0.5) * 2)),
        battery: Math.max(5, Math.min(100, prev.battery + (Math.random() - 0.5) * 0.5)),
      }));
      setCurrentTime(new Date()); // update time on every sensor update
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className="flex-1 bg-green-50 p-4">
      <View className="flex-row space-x-4 mb-4">
        <WaterLevel waterLevel={sensorData.waterLevel} />
        <BotStatus
          isActive={isActive}
          temperature={25}
          uptime="2h"
          connectionQuality={90}
          batteryPercentage={sensorData.battery}
        />

      </View>
    </ScrollView>
  );
}
