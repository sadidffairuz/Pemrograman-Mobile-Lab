import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardProps {
  time: string;
  duration: string;
  tag: string;
  tagColor?: 'light' | 'dark';
  title: string;
  description: string;
  coordinates: string;
}

export default function Card({
  time,
  duration,
  tag,
  tagColor = 'light',
  title,
  description,
  coordinates,
}: CardProps) {
  const isDarkTag = tagColor === 'dark';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
          <Text style={styles.dot}> • </Text>
          <Text style={styles.timeText}>{duration}</Text>
        </View>
        <View style={[styles.tag, isDarkTag ? styles.tagDark : styles.tagLight]}>
          <Text style={[styles.tagText, isDarkTag ? styles.tagTextDark : styles.tagTextLight]}>
            {tag}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.mapContainer}>
        <View style={styles.mapLines} />
        
        <View style={styles.mapDotOuter}>
          <View style={styles.mapDotInner} />
        </View>

        <View style={styles.coordinatesPill}>
          <View style={styles.coordinateDot} />
          <Text style={styles.coordinateText}>{coordinates}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  dot: {
    fontSize: 12,
    color: '#999',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagLight: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
  },
  tagDark: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tagTextLight: {
    color: '#000000',
  },
  tagTextDark: {
    color: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  mapContainer: {
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '15deg' }, { scale: 1.5 }],
  },
  mapDotOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
  },
  coordinatesPill: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  coordinateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0066cc',
    marginRight: 6,
  },
  coordinateText: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'monospace',
  },
});
