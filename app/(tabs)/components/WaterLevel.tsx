import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // <- vector icons

interface WaterLevelProps {
  waterLevel: number; // percentage 0-100
  capacity?: number; // optional, default 50
  unit?: string; // optional, default "L"
}

export function WaterLevel({ waterLevel, capacity = 50, unit = "L" }: WaterLevelProps) {
  const currentVolume = (waterLevel / 100) * capacity;

  const getColor = (p: number) => {
    if (p > 70) return "#3b82f6"; // blue
    if (p > 30) return "#60a5fa"; // light blue
    return "#f97316"; // orange/red
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Tank</Text>
        <Icon name="droplet" size={24} color="#3b82f6" /> {/* <- vector icon */}
      </View>

      <View style={styles.container}>
        {/* Water tank visual */}
        <View style={styles.tank}>
          <View style={[styles.water, { height: `${waterLevel}%`, backgroundColor: getColor(waterLevel) }]} />
          {[25, 50, 75, 100].map((level) => (
            <View key={level} style={[styles.line, { bottom: `${level}%` }]}>
              <Text style={styles.lineLabel}>{level}%</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={styles.statValue}>{waterLevel.toFixed(0)}%</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{currentVolume.toFixed(1)}{unit}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Status</Text>
            <Text
              style={[
                styles.status,
                waterLevel > 70
                  ? styles.optimal
                  : waterLevel > 30
                  ? styles.good
                  : styles.low,
              ]}
            >
              {waterLevel > 70 ? "Optimal" : waterLevel > 30 ? "Good" : "Low"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#f0f9ff", borderRadius: 12, padding: 16, marginVertical: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "600", color: "#1f2937" },
  container: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  tank: { width: 60, height: 200, borderWidth: 3, borderColor: "#9ca3af", borderRadius: 8, backgroundColor: "#e5e7eb", overflow: "hidden", position: "relative" },
  water: { position: "absolute", left: 0, right: 0, bottom: 0 },
  line: { position: "absolute", left: 0, right: 0, borderTopWidth: 1, borderTopColor: "#9ca3af50" },
  lineLabel: { position: "absolute", right: -30, fontSize: 10, color: "#6b7280" },
  stats: { flex: 1, marginLeft: 16, justifyContent: "space-between" },
  statBlock: { marginBottom: 12 },
  statLabel: { fontSize: 12, color: "#6b7280" },
  statValue: { fontSize: 20, fontWeight: "700", color: "#2563eb" },
  status: { fontSize: 14, fontWeight: "600" },
  optimal: { color: "#16a34a" },
  good: { color: "#2563eb" },
  low: { color: "#f97316" },
});
