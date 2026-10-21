<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Profil Saya</Text>
      <Text style={styles.subtitle}>Selamat datang di halaman profil!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3C34',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
=======
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Link href="/" style={styles.link}>Back to Home</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F8FC",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    link: {
        color: "#5B6CFF",
        fontSize: 16,
        fontWeight: "600",
    },
>>>>>>> 78d5c7152e64b889810b4bcb5e3e90d3c9fe8486
});