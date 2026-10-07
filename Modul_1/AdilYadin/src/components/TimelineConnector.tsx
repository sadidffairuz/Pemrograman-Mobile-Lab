import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TimelineConnectorProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  isLast?: boolean;
}

export default function TimelineConnector({ icon, color, isLast = false }: TimelineConnectorProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.node, { backgroundColor: color }]}>
        <Ionicons name={icon} size={14} color="#fff" />
      </View>
      {!isLast && <View style={styles.line} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginTop: 16,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#e6e6fa',
    marginTop: -8,
    zIndex: 1,
  },
});
