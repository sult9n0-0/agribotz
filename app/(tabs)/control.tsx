import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg";

export default function ControlPanel() {
  const handleMove = (direction: string) => {
    console.log("Move:", direction);
    // TODO: Send move command to your bot
  };

  return (
    <View style={styles.card}>
      {/* Camera Feed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Live Camera Feed</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Camera Feed */}
      <View style={styles.cameraContainer}>
        <Svg style={styles.grid} height="100%" width="100%">
          <Defs>
            <Pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <Path d="M 40 0 L 0 0 0 40" stroke="white" strokeWidth="0.5" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grid)" />
        </Svg>

        <View style={styles.centerContent}>
          <View style={styles.iconWrapper}>
            <Feather name="camera" size={40} color="#fff" />
          </View>
          <Text style={styles.feedTitle}>Live Feed</Text>
          <Text style={styles.feedSubtitle}>
            Real-time camera from Agribottz
          </Text>
        </View>

        <View style={styles.powerBadge}>
          <Feather name="zap" size={16} color="#60a5fa" />
          <Text style={styles.powerText}>ACTIVE</Text>
        </View>
      </View>

      {/* Bot Controls */}
      <View style={styles.controls}>
        {/* Up Arrow */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMove("forward")}
        >
          <Feather name="arrow-up" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Left & Right */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMove("left")}
          >
            <Feather name="arrow-left" size={32} color="#fff" />
          </TouchableOpacity>

          <View style={{ width: 70 }} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMove("right")}
          >
            <Feather name="arrow-right" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Down Arrow */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMove("backward")}
        >
          <Feather name="arrow-down" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0a0a0a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#fff" },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
  },
  liveDot: {
    width: 6,
    height: 6,
    backgroundColor: "#22c55e",
    borderRadius: 3,
    marginRight: 6,
  },
  liveText: { color: "#22c55e", fontSize: 12, fontWeight: "600" },

  cameraContainer: {
    backgroundColor: "#000",
    borderRadius: 12,
    height: 220,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  grid: { position: "absolute", opacity: 0.12 },
  centerContent: { zIndex: 20, alignItems: "center" },
  iconWrapper: {
    backgroundColor: "#059669",
    padding: 14,
    borderRadius: 50,
    marginBottom: 10,
  },
  feedTitle: { fontSize: 18, fontWeight: "600", color: "#fff" },
  feedSubtitle: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  powerBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.3)",
  },
  powerText: { color: "#60a5fa", fontSize: 12, marginLeft: 4, fontWeight: "600" },

  controls: { marginTop: 20, alignItems: "center" },
  row: { flexDirection: "row", marginVertical: 10 },

  button: {
    backgroundColor: "#059669",
    padding: 28,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
});
