import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleSubmit = () => {
    if (mode === "login") {
      console.log("Logging in with", email, password);
    } else {
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return;
      }
      console.log("Signing up with", email, password);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Text className="text-3xl font-bold mb-6 text-gray-800">
        {mode === "login" ? "Login" : "Sign Up"}
      </Text>

      <TextInput
        className="w-full border border-gray-300 rounded-2xl p-4 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="w-full border border-gray-300 rounded-2xl p-4 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {mode === "signup" && (
        <TextInput
          className="w-full border border-gray-300 rounded-2xl p-4 mb-4"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-blue-600 p-4 rounded-2xl mb-4"
      >
        <Text className="text-center text-white text-lg font-bold">
          {mode === "login" ? "Login" : "Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={switchMode}>
        <Text className="text-blue-600 text-base">
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}