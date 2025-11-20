import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface BotStatusProps {
  isActive: boolean;
  temperature: number;
  uptime: string;
  connectionQuality: number;
  batteryPercentage: number;
}

export function BotStatus({
  isActive,
  temperature,
  uptime,
  connectionQuality,
  batteryPercentage,
}: BotStatusProps) {
  const getBatteryColor = (battery: number) => {
    if (battery > 60) return "#16a34a"; // green
    if (battery > 30) return "#ca8a04"; // yellow
    return "#dc2626"; // red
  };

  const getBatteryBarColor = (battery: number) => {
    if (battery > 60) return ["#34d399", "#10b981"]; // green gradient
    if (battery > 30) return ["#facc15", "#f97316"]; // yellow-orange gradient
    return ["#f87171", "#ef4444"]; // red gradient
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Bot Status</Text>
        <View style={[styles.badge, { backgroundColor: isActive ? "#16a34a" : "#9ca3af" }]}>
          <View style={[styles.dot, { backgroundColor: isActive ? "#a7f3d0" : "#d1d5db" }]} />
          <Text style={styles.badgeText}>{isActive ? "Active" : "Offline"}</Text>
        </View>
      </View>

      {/* Status Grid */}
      <View style={styles.grid}>
        {/* Temperature */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Feather name="activity" size={16} color="#3b82f6" />
            <Text style={styles.statLabel}>Temperature</Text>
          </View>
          <Text style={styles.statValue}>{temperature.toFixed(1)}°C</Text>
        </View>

        {/* Uptime */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Feather name="zap" size={16} color="#facc15" />
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
          <Text style={styles.statValue}>{uptime}</Text>
        </View>

        {/* Connection */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Feather name="wifi" size={16} color="#06b6d4" />
            <Text style={styles.statLabel}>Connection</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${connectionQuality}%`, backgroundColor: "#06b6d4" }]} />
            <Text style={styles.progressText}>{connectionQuality}%</Text>
          </View>
        </View>

        {/* Data Points */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Feather name="database" size={16} color="#a855f7" />
            <Text style={styles.statLabel}>Data Points</Text>
          </View>
          <Text style={styles.statValue}>1,248</Text>
        </View>

        {/* Battery */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Feather name="battery" size={16} color={getBatteryColor(batteryPercentage)} />
            <Text style={styles.statLabel}>Battery</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${batteryPercentage}%`, backgroundColor: getBatteryColor(batteryPercentage) },
                ]}
              />
            </View>
            <Text style={[styles.statValue, { color: getBatteryColor(batteryPercentage) }]}>
              {Math.round(batteryPercentage)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.button, isActive ? styles.buttonActive : styles.buttonDisabled]} disabled={!isActive}>
          <Feather name="power" size={16} color="#fff" />
          <Text style={styles.buttonText}>Power On</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, !isActive ? styles.buttonActive : styles.buttonDisabled]} disabled={isActive}>
          <Feather name="power" size={16} color="#fff" />
          <Text style={styles.buttonText}>Power Off</Text>
        </TouchableOpacity>
      </View>

      {/* Maintenance */}
      <View style={styles.maintenance}>
        <Feather name="alert-circle" size={20} color="#f59e0b" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.maintenanceTitle}>Maintenance Check</Text>
          <Text style={styles.maintenanceText}>Next scheduled check in 2 days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "600", color: "#1f2937" },
  badge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: { width: "48%", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 8 },
  statHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4, gap: 4 },
  statLabel: { fontSize: 10, color: "#6b7280", marginLeft: 4 },
  statValue: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  progressBarContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  progressBarBackground: { flex: 1, height: 8, backgroundColor: "#e5e7eb", borderRadius: 4, overflow: "hidden", marginRight: 8 },
  progressBar: { height: "100%", borderRadius: 4 },
  progressText: { fontSize: 12, color: "#374151", fontWeight: "600" },
  controls: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  button: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 8, gap: 4, marginHorizontal: 4 },
  buttonActive: { backgroundColor: "#16a34a" },
  buttonDisabled: { backgroundColor: "#9ca3af" },
  buttonText: { color: "#fff", fontWeight: "600" },
  maintenance: { flexDirection: "row", alignItems: "center", backgroundColor: "#fef3c7", padding: 12, borderRadius: 8, marginTop: 12 },
  maintenanceTitle: { fontSize: 12, fontWeight: "600", color: "#b45309" },
  maintenanceText: { fontSize: 10, color: "#92400e", marginTop: 2 },
});
