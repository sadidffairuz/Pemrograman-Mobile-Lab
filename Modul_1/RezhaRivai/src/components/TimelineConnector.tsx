import React from 'react';
import { StyleSheet, View } from 'react-native';

interface TimelineConnectorProps {
  isLast?: boolean;
  isActive?: boolean;
}

export default function TimelineConnector({ isLast = false, isActive = false }: TimelineConnectorProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.nodeOuter, isActive && styles.nodeOuterActive]}>
        <View style={[styles.nodeInner, isActive && styles.nodeInnerActive]} />
      </View>
      
      {!isLast && <View style={styles.line} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 24,
    marginRight: 16,
  },
  nodeOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 2,
    marginTop: 20,
  },
  nodeOuterActive: {
    borderColor: '#0066cc',
  },
  nodeInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  nodeInnerActive: {
    backgroundColor: '#0066cc',
  },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: '#ccc',
    marginTop: -8,
    zIndex: 1,
  },
});
