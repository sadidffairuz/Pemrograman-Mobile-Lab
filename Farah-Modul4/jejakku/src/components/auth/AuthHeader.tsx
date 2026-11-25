import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface AuthHeaderProps {
  isRegister: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ isRegister }) => {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <Ionicons name="map" size={24} color="#fff" />
        </View>
        <Text style={styles.brand}>
          jejakku<Text style={{ color: colors.accent }}>.</Text>
        </Text>
      </View>

      <Text style={styles.heading}>
        {isRegister ? 'Mulai Petualanganmu ✦' : 'Selamat Datang Kembali 👋'}
      </Text>
      <Text style={styles.subheading}>
        {isRegister
          ? 'Daftar akun untuk menyimpan jejak dan kenangan perjalananmu.'
          : 'Masuk untuk melanjutkan dan mengabadikan setiap langkahmu.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  brandIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 6,
  },
});
