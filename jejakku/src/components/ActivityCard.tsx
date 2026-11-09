import { Ionicons } from '@expo/vector-icons';
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
  onPress: () => void;
}

export default function ActivityCard({
  activity,
  onPress,
}: ActivityCardProps) {
  return (
    <Pressable
      role="article"
      aria-label={`Aktivitas di ${activity.place}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View
        role="img"
        aria-label={`Ikon ${activity.category}`}
        style={styles.iconContainer}
      >
        <Text style={styles.icon}>
          {activity.icon}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            role="heading"
            aria-level={3}
            style={styles.place}
            numberOfLines={1}
          >
            {activity.place}
          </Text>

          <Text role="status" style={styles.category}>
            {activity.category}
          </Text>
        </View>

        <Text role="note" style={styles.time}>
          {activity.startTime} — {activity.endTime}
        </Text>

        <Text role="note" style={styles.duration}>
          {activity.duration}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={colors.textLight}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  pressed: {
    opacity: 0.75,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 22,
  },

  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  place: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },

  category: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: '#EEF0FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  time: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },

  duration: {
    fontSize: 11,
    color: colors.textLight,
  },
});
