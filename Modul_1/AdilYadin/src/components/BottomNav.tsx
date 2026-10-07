import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Ionicons name="analytics" size={24} color="#000" />
        <Text style={styles.tabText}>Timeline</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="book-outline" size={24} color="#666" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>Journal</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <MaterialCommunityIcons name="chart-bar" size={24} color="#666" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>Insights</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Ionicons name="options-outline" size={24} color="#666" />
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
    borderTopColor: '#f0f0f0',
    paddingBottom: 24,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '700',
    color: '#000',
  },
  tabTextInactive: {
    color: '#666',
    fontWeight: '500',
  },
});
