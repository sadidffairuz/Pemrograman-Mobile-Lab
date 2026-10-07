import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimelineConnector from './TimelineConnector';
import Card from './Card';

interface TimelineItemProps {
  isLast?: boolean;
  isActive?: boolean;
  cardProps: {
    time: string;
    duration: string;
    tag: string;
    tagColor?: 'light' | 'dark';
    title: string;
    description: string;
    coordinates: string;
  };
}

export default function TimelineItem({ isLast = false, isActive = false, cardProps }: TimelineItemProps) {
  return (
    <View style={styles.container}>
      <TimelineConnector isLast={isLast} isActive={isActive} />
      <View style={styles.cardWrapper}>
        <Card {...cardProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cardWrapper: {
    flex: 1,
  }
});
