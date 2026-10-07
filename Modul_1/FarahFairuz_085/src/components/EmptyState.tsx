import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🫧</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  icon: {
    fontSize: 38,
    marginBottom: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  message: {
    marginTop: 6,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 20,
  },
});