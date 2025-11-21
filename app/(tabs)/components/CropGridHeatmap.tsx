import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { CropActionModal } from "./CropActionModal";

interface CropGridHeatmapProps {
  temperatures: number[][];
  moistures: number[][];
  phValues: number[][];
  lastChecked: (number | null)[][];
}

// Icons
const TomatoIcon = () => (
  <Svg viewBox="0 0 100 100" width={24} height={24}>
    <Circle cx="50" cy="50" r="35" fill="#EF4444" />
    <Circle cx="35" cy="35" r="12" fill="#DC2626" />
    <Path d="M 50 15 Q 55 10 60 15 Q 65 20 60 25 Q 55 25 50 22 Q 45 25 40 25 Q 35 20 40 15 Q 45 10 50 15" fill="#22C55E" />
  </Svg>
);

const OnionIcon = () => (
  <Svg viewBox="0 0 100 100" width={24} height={24}>
    <Ellipse cx="50" cy="55" rx="28" ry="30" fill="#F3E8FF" stroke="#A78BFA" strokeWidth={2} />
    <Ellipse cx="50" cy="50" rx="30" ry="28" fill="#DDD6FE" />
    <Ellipse cx="50" cy="45" rx="32" ry="26" fill="#E9D5FF" />
    <Path d="M 45 20 Q 50 10 55 20 L 52 35 Q 50 38 48 35 Z" fill="#22C55E" />
  </Svg>
);

const CarrotIcon = () => (
  <Svg viewBox="0 0 100 100" width={24} height={24}>
    <Path d="M 50 15 L 65 55 L 35 55 Z" fill="#FF8C00" />
    <Ellipse cx="50" cy="70" rx="12" ry="8" fill="#FF8C00" />
    <Path d="M 40 15 Q 45 5 50 15 Q 55 5 60 15 M 35 10 Q 40 0 45 10 M 55 10 Q 60 0 65 10" stroke="#22C55E" strokeWidth={1.5} fill="none" />
  </Svg>
);

export function CropGridHeatmap({ temperatures, moistures, phValues, lastChecked }: CropGridHeatmapProps) {
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  // Keep moisture in state so we can update when watered
  const [moistureState, setMoistures] = useState(moistures);

  // Initialize checkedState so unwatered crops are null
  const [checkedState, setCheckedState] = useState(
    lastChecked.map(row => row.map(val => (val === 0 ? 0 : null)))
  );

  // Determine cell color based on moisture and temperature
  const getCellColor = (temp: number, moisture: number, lastTime: number | null) => {
    if (lastTime === 0) return "#4ade80"; // green if watered
    if (moisture < 30) return "#f87171";  // red = dry
    if (moisture < 60) return "#facc15";  // yellow = moderate
    return "#4ade80";                     // green = good
  };

  const getCropInfo = (colIndex: number) => {
    if (colIndex < 2) return { name: "Tomato", icon: <TomatoIcon />, color: "#f87171" };
    if (colIndex < 4) return { name: "Onion", icon: <OnionIcon />, color: "#a78bfa" };
    return { name: "Carrot", icon: <CarrotIcon />, color: "#fb923c" };
  };

  // Called when crop is watered
  const markWatered = (row: number, col: number) => {
    const newChecked = checkedState.map(r => [...r]);
    const newMoistures = moistureState.map(r => [...r]);

    newChecked[row][col] = 0;      // mark watered now
    newMoistures[row][col] = 80;   // increase moisture after watering

    setCheckedState(newChecked);
    setMoistures(newMoistures);
  };

  // Flatten 2D grid into 1D array
  const allCells: any[] = [];
  temperatures.forEach((row, rowIndex) => {
    row.forEach((temp, colIndex) => {
      const moisture = moistureState[rowIndex][colIndex];
      const ph = phValues[rowIndex][colIndex];
      const crop = getCropInfo(colIndex);
      const lastTime = checkedState[rowIndex][colIndex];

      allCells.push(
        <TouchableOpacity
          key={`${rowIndex}-${colIndex}`}
          style={[styles.cell, { backgroundColor: getCellColor(temp, moisture, lastTime) }]}
          onPress={() =>
            setSelectedCrop({
              cropName: crop.name,
              row: rowIndex,
              col: colIndex,
              temperature: temp,
              moisture,
              ph,
              lastCheckedMinutesAgo: lastTime,
              cropIcon: crop.icon,
            })
          }
        >
          {crop.icon}
          <Text style={styles.cellText}>{temp.toFixed(1)}°C</Text>
          <Text style={styles.cellText}>{moisture.toFixed(1)}%</Text>
          <Text style={styles.cellText}>pH {ph.toFixed(2)}</Text>
        </TouchableOpacity>
      );
    });
  });

  // Split cells into rows of 4
  const rows = [];
  for (let i = 0; i < allCells.length; i += 4) {
    rows.push(allCells.slice(i, i + 4));
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={styles.card}>
        <Text style={styles.header}>Crop Grid Analysis</Text>
        <View style={styles.grid}>
          {rows.map((rowCells, idx) => (
            <View key={idx} style={styles.row}>
              {rowCells}
            </View>
          ))}
        </View>

        <CropActionModal
          isOpen={selectedCrop !== null}
          onClose={() => setSelectedCrop(null)}
          cropData={selectedCrop}
          onWaterCrop={markWatered} // pass callback
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  header: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  grid: { flexDirection: "column", gap: 6 },
  row: { flexDirection: "row", gap: 6 },
  cell: {
    width: 90,
    height: 90,
    borderRadius: 8,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: { color: "#fff", fontSize: 10, fontWeight: "bold", textAlign: "center" },
});
