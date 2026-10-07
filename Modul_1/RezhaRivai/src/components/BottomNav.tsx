import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Ionicons name="calendar-outline" size={24} color="#000" />
        <Text style={styles.tabText}>Today</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="time-outline" size={24} color="#666" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>History</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="settings-outline" size={24} color="#666" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 24,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
    color: '#000',
  },
  tabTextInactive: {
    color: '#666',
    fontWeight: '500',
  },
});
