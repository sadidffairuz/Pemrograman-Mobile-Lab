import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface TrailCardProps {
  time: string;
  duration?: string;
  tag: string;
  tagColor?: string;
  tagIcon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  image?: boolean;
}

export default function TrailCard({
  time,
  duration,
  tag,
  tagColor = '#e0e0e0',
  tagIcon,
  title,
  description,
  image = false,
}: TrailCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.timeWrap}>
          <Text style={styles.timeText}>{time}</Text>
          {duration && (
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          )}
        </View>
        <View style={[styles.tagBadge, { backgroundColor: tagColor + '30' }]}>
          {tagIcon && <Ionicons name={tagIcon as any} size={12} color={tagColor} style={styles.tagIcon} />}
          <Text style={[styles.tagText, { color: tagColor }]}>{tag}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.contentRow}>
        {image && (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={24} color="#ccc" />
          </View>
        )}
        <View style={styles.textContent}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Tap to view entry</Text>
            <Ionicons name="arrow-forward" size={14} color="#000" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  durationBadge: {
    backgroundColor: '#ffe6cc',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#cc7a00',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  contentRow: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginRight: 4,
  },
});
