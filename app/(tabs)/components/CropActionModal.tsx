import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface CropActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropData: {
    cropName: string;
    row: number;
    col: number;
    temperature: number;
    moisture: number;
    ph: number;
    lastCheckedMinutesAgo: number | null;
    cropIcon: React.ReactNode;
  } | null;
  onWaterCrop?: (row: number, col: number) => void; // New callback prop
}

export function CropActionModal({ isOpen, onClose, cropData, onWaterCrop }: CropActionModalProps) {
  const [isWatering, setIsWatering] = useState(false);
  const [wateringComplete, setWateringComplete] = useState(false);

  const handleWater = async () => {
    if (!cropData) return;

    setIsWatering(true);
    await new Promise(res => setTimeout(res, 2000)); // Simulate watering
    setIsWatering(false);
    setWateringComplete(true);

    // Notify parent to mark this crop as watered (green)
    if (onWaterCrop) {
      onWaterCrop(cropData.row, cropData.col);
    }

    setTimeout(() => {
      setWateringComplete(false);
      onClose();
    }, 2000);
  };

  if (!cropData) return null;

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 40) return { text: "Low - Needs watering", color: "#dc2626" };
    if (moisture < 60) return { text: "Moderate", color: "#d97706" };
    return { text: "Optimal", color: "#16a34a" };
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 20) return { text: "Cold", color: "#2563eb" };
    if (temp < 28) return { text: "Optimal", color: "#16a34a" };
    return { text: "Hot", color: "#dc2626" };
  };

  const getPhStatus = (ph: number) => {
    if (ph < 6) return { text: "Acidic", color: "#ea580c" };
    if (ph <= 7.5) return { text: "Neutral", color: "#16a34a" };
    return { text: "Alkaline", color: "#2563eb" };
  };

  const moistureStatus = getMoistureStatus(cropData.moisture);
  const tempStatus = getTemperatureStatus(cropData.temperature);
  const phStatus = getPhStatus(cropData.ph);

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {wateringComplete ? (
            <View style={styles.centeredContent}>
              <View style={styles.iconCircle}>
                <Icon name="droplet" size={32} color="#16a34a" />
              </View>
              <Text style={styles.title}>Watering Complete!</Text>
              <Text style={styles.subtitle}>
                {`${cropData.cropName} crop has been watered successfully.`}
              </Text>
            </View>
          ) : (
            <View>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.cropIcon}>{cropData.cropIcon}</View>
                <View>
                  <Text style={styles.cropName}>{cropData.cropName}</Text>
                  <Text style={styles.gridPosition}>
                    {`Grid Position: [${cropData.row + 1}, ${cropData.col + 1}]`}
                  </Text>
                </View>
              </View>

              {/* Last Checked */}
              <View style={styles.lastCheckedBox}>
                <Text style={styles.label}>Last Analyzed</Text>
                <Text style={styles.value}>
                  {cropData.lastCheckedMinutesAgo === null
                    ? "Never checked"
                    : cropData.lastCheckedMinutesAgo === 0
                    ? "Just now"
                    : `${cropData.lastCheckedMinutesAgo} minutes ago`}
                </Text>
              </View>

              {/* Conditions */}
              <View style={{ marginVertical: 8 }}>
                <Text style={styles.label}>Current Conditions</Text>

                {/* Soil Moisture */}
                <View style={[styles.conditionBox, { borderColor: moistureStatus.color }]}>
                  <View style={styles.row}>
                    <Icon name="droplet" size={20} color={moistureStatus.color} />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={styles.conditionLabel}>Soil Moisture</Text>
                      <Text style={{ color: moistureStatus.color, fontWeight: "bold" }}>
                        {moistureStatus.text}
                      </Text>
                    </View>
                    <Text style={styles.conditionValue}>{`${cropData.moisture.toFixed(1)}%`}</Text>
                  </View>
                </View>

                {/* Temperature */}
                <View style={[styles.conditionBox, { borderColor: "#3b82f6" }]}>
                  <View style={styles.row}>
                    <Icon name="thermometer" size={20} color="#3b82f6" />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={styles.conditionLabel}>Temperature</Text>
                      <Text style={{ color: tempStatus.color, fontWeight: "bold" }}>
                        {tempStatus.text}
                      </Text>
                    </View>
                    <Text style={styles.conditionValue}>{`${cropData.temperature.toFixed(1)}°C`}</Text>
                  </View>
                </View>

                {/* Soil pH */}
                <View style={[styles.conditionBox, { borderColor: "#fbbf24" }]}>
                  <View style={styles.row}>
                    <Icon name="leaf" size={20} color="#16a34a" />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={styles.conditionLabel}>Soil pH</Text>
                      <Text style={{ color: phStatus.color, fontWeight: "bold" }}>
                        {phStatus.text}
                      </Text>
                    </View>
                    <Text style={styles.conditionValue}>{cropData.ph.toFixed(2)}</Text>
                  </View>
                </View>
              </View>

              {/* Low Moisture Alert */}
              {cropData.moisture < 40 && (
                <View style={styles.alertBox}>
                  <Icon name="alert-circle" size={20} color="#dc2626" />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={styles.alertTitle}>Soil moisture is low</Text>
                    <Text style={styles.alertText}>
                      This crop needs watering to maintain optimal growth.
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={{ marginTop: 12 }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#3b82f6" }]}
                  onPress={handleWater}
                  disabled={isWatering}
                >
                  <Icon name="droplet" size={16} color="#fff" />
                  <Text style={styles.buttonText}>
                    {isWatering ? "Watering..." : "Water Crop"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={onClose}>
                  <Text style={[styles.buttonText, { color: "#3b82f6" }]}>Close</Text>
                </TouchableOpacity>
              </View>

              {/* Tips */}
              <View style={styles.tipsBox}>
                <Text style={styles.label}>💡 Crop Care Tips</Text>
                <Text style={styles.tip}>• Water when soil moisture drops below 40%</Text>
                <Text style={styles.tip}>• Optimal temperature range: 20-28°C</Text>
                <Text style={styles.tip}>
                  {`• Neutral soil pH (6.0-7.5) is ideal for ${cropData.cropName.toLowerCase()}`}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

// ... keep existing styles unchanged


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "90%",
  },
  centeredContent: { alignItems: "center", justifyContent: "center", padding: 24 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#d1fae5", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#374151", textAlign: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cropIcon: { marginRight: 12 },
  cropName: { fontSize: 20, fontWeight: "bold" },
  gridPosition: { fontSize: 14, color: "#6b7280" },
  lastCheckedBox: { backgroundColor: "#dbf4ff", borderRadius: 8, padding: 8, marginVertical: 8, borderWidth: 1, borderColor: "#bfdbfe" },
  label: { fontSize: 14, fontWeight: "600" },
  value: { fontSize: 12, color: "#1d4ed8", fontWeight: "500" },
  conditionBox: { borderWidth: 1, borderRadius: 8, padding: 8, marginVertical: 4 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  conditionLabel: { fontSize: 12, fontWeight: "500" },
  conditionValue: { fontWeight: "bold", fontSize: 14 },
  alertBox: { flexDirection: "row", backgroundColor: "#fee2e2", borderWidth: 1, borderColor: "#fca5a5", borderRadius: 8, padding: 8, marginVertical: 8 },
  alertTitle: { fontSize: 12, fontWeight: "600", color: "#991b1b" },
  alertText: { fontSize: 11, color: "#b91c1c" },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 12, borderRadius: 8, marginVertical: 4 },
  buttonOutline: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#3b82f6" },
  buttonText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
  tipsBox: { backgroundColor: "#f3f4f6", borderRadius: 8, padding: 8, marginTop: 8 },
  tip: { fontSize: 12, color: "#374151", marginBottom: 2 },
});
