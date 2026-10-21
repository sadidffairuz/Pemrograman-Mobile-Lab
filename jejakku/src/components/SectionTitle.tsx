import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },

  title: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textSecondary,
  },
});