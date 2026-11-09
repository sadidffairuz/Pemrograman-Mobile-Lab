import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { colors } from '../constants/colors';

export default function Profile() {
  return (
    <View style={styles.container} role="main">
      <Text style={styles.title} role="heading" aria-level={1}>Profil</Text>
      <Link href="/" style={styles.link} role="link" accessibilityLabel="Kembali ke Beranda">
        Kembali ke Beranda
      </Link>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  link: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
