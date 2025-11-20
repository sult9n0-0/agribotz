import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // TODO: Add backend integration
    console.log('Signup pressed', { name, email, password });
    // After signup, navigate to login or main tabs
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Create Account</Text>

      <TextInput
      placeholder="Full Name"
      value={name}
      onChangeText={setName}
      style={styles.input}
      placeholderTextColor="#1b3b1b" // dark green for readability
    />

    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={styles.input}
      keyboardType="email-address"
      placeholderTextColor="#1b3b1b"
    />

    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      style={styles.input}
      secureTextEntry
      placeholderTextColor="#1b3b1b"
    />


      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f8e0', // light agriculture green
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // dark green
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#a8e6a3', // slightly darker green
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: '#1b3b1b', // dark text
  },
  button: {
    backgroundColor: '#2e7d32', // dark green
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#1b3b1b',
    textAlign: 'center',
  },
  loginLink: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});
