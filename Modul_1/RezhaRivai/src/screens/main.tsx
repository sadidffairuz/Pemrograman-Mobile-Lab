import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import TimelineItem from '../components/TimelineItem';
import BottomNav from '../components/BottomNav';

const timelineData = [
  {
    time: '08:30 AM',
    duration: '45m',
    tag: 'Cafe',
    tagColor: 'light' as const,
    title: 'Blue Bottle Coffee',
    description: 'Morning pour-over & notebook prep',
    coordinates: '35.6628° N, 139.7000° E',
  },
  {
    time: '09:45 AM',
    duration: '3h 15m',
    tag: 'Campus',
    tagColor: 'light' as const,
    title: 'Central Science Library & Campus',
    description: 'Research session & bibliography review',
    coordinates: '35.7126° N, 139.7620° E',
  },
  {
    time: '01:15 PM',
    duration: '50m',
    tag: 'Bakery',
    tagColor: 'light' as const,
    title: 'Kitsune Bakery & Garden',
    description: 'Matcha croissant with Alex',
    coordinates: '35.6652° N, 139.7123° E',
  },
  {
    time: '02:40 PM',
    duration: '1h 30m',
    tag: 'Culture',
    tagColor: 'dark' as const,
    title: 'Mori Art Museum & Lookout',
    description: 'Contemporary sculpture exhibit',
    coordinates: '35.6605° N, 139.7292° E',
  },
];

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Ionicons name="navigate-outline" size={24} color="black" style={{ transform: [{ rotate: '45deg' }] }} />
        <Text style={styles.headerTitle}>Thursday, Oct 24</Text>
        <Ionicons name="options-outline" size={24} color="black" />
      </View>

      <View style={styles.content}>
        
        <View style={styles.statusPill}>
          <View style={styles.statusLeft}>
            <View style={styles.activeDot} />
            <Text style={styles.statusText}>GPS ACTIVE • 4 STOPS LOGGED</Text>
          </View>
          <Text style={styles.statusDistance}>6.2 km total</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={index} 
              cardProps={item} 
              isLast={index === timelineData.length - 1}
              isActive={index === timelineData.length - 1}
            />
          ))}
        </ScrollView>

        <Pressable style={styles.fab}>
          <Ionicons name="location" size={20} color="white" />
          <Text style={styles.fabText}>Log Location</Text>
        </Pressable>

      </View>

      <BottomNav />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
    marginBottom: 24,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066cc',
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    fontWeight: '500',
  },
  statusDistance: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
});
