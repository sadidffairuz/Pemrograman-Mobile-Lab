import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransportPillProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color?: string;
  backgroundColor?: string;
}

export default function TransportPill({ 
  icon, 
  text, 
  color = '#4338ca', 
  backgroundColor = '#eef2ff' 
}: TransportPillProps) {
  return (
    <View style={styles.pillContainer}>
      <View style={[styles.pill, { backgroundColor }]}>
        <Ionicons name={icon} size={14} color={color} style={styles.icon} />
        <Text style={[styles.text, { color }]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    paddingLeft: 32,
    marginVertical: 4,
    zIndex: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
