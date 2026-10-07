import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SummaryCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>DAILY SUMMARY</Text>
          <Text style={styles.title}>Thursday, Oct 24</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle-outline" size={14} color="#a0c4ff" />
          <Text style={styles.badgeText}>Auto-Logged</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(72, 219, 139, 0.2)' }]}>
            <Ionicons name="location-outline" size={20} color="#48db8b" />
          </View>
          <View>
            <Text style={styles.itemValue}>3 Places</Text>
            <Text style={styles.itemLabel}>Visited</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(200, 200, 255, 0.2)' }]}>
            <MaterialCommunityIcons name="map-marker-path" size={20} color="#c8c8ff" />
          </View>
          <View>
            <Text style={styles.itemValue}>12.4 km</Text>
            <Text style={styles.itemLabel}>Traveled</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 200, 150, 0.2)' }]}>
            <Ionicons name="hourglass-outline" size={20} color="#ffc896" />
          </View>
          <View>
            <Text style={styles.itemValue}>4h 10m</Text>
            <Text style={styles.itemLabel}>Dwell Time</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(72, 219, 139, 0.2)' }]}>
            <Ionicons name="walk-outline" size={20} color="#48db8b" />
          </View>
          <View>
            <Text style={styles.itemValue}>7,840</Text>
            <Text style={styles.itemLabel}>Steps</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1b3b',
    borderRadius: 20,
    padding: 20,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  subtitle: {
    color: '#8b8ba7',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  badgeText: {
    color: '#e0e0ff',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemLabel: {
    color: '#8b8ba7',
    fontSize: 12,
    marginTop: 2,
  },
});
