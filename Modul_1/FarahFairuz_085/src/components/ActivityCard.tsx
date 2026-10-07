import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Activity } from '../types/activity';
import { colors } from '../constants/colors';

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
}

export default function ActivityCard({
  activity,
  onPress,
}: ActivityCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>
          {activity.icon}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={styles.place}
            numberOfLines={1}
          >
            {activity.place}
          </Text>

          <Text style={styles.category}>
            {activity.category}
          </Text>
        </View>

        <Text style={styles.time}>
          {activity.startTime} — {activity.endTime}
        </Text>

        <Text style={styles.duration}>
          {activity.duration}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  pressed: {
    opacity: 0.72,
    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#F0F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  icon: {
    fontSize: 25,
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  place: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  category: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: '#EEF0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  time: {
    marginTop: 5,
    fontSize: 13,
    color: colors.textSecondary,
  },

  duration: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },

  arrow: {
    fontSize: 27,
    color: colors.textLight,
    marginLeft: 8,
  },
});