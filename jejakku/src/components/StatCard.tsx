import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

export default function StatCard({
  icon,
  value,
  label,
}: StatCardProps) {
  return (
    <View role="summary" aria-label={`Statistik ${label}`} style={styles.card}>
      <Text role="img" aria-label={label} style={styles.icon}>{icon}</Text>
      <Text role="status" style={styles.value}>{value}</Text>
      <Text role="note" style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 95,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  icon: {
    fontSize: 20,
    marginBottom: 7,
  },

  value: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
