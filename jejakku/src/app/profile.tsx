import React, { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { colors } from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import { listLocations } from '../services/databaseService';
import { SavedLocation } from '../types/location';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [locations, setLocations] = useState<SavedLocation[]>([]);

  useFocusEffect(
    useCallback(() => {
      listLocations()
        .then(setLocations)
        .catch(() => setLocations([]));
    }, []),
  );

  const uniquePlaces = new Set(locations.map((item) => item.placeName)).size;
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Petualang Jejakku';
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah kamu yakin ingin keluar dari akun ini? Sesi akan dibersihkan dari penyimpanan aman perangkat.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Text style={styles.pageTitle}>Profil Petualang</Text>
        </View>

        <View style={styles.identityCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View style={styles.verifiedDot}>
              <Ionicons name="checkmark-sharp" size={12} color="#fff" />
            </View>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'email@petualang.id'}
          </Text>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>
              Penjelajah Aktif · Jejakku Member
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>RINGKASAN PERJALANANMU</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{uniquePlaces}</Text>
            <Text style={styles.statLabel}>Tempat</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{locations.length}</Text>
            <Text style={styles.statLabel}>Catatan</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Tersimpan</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>PENGATURAN & INFORMASI</Text>
        <View style={styles.menuCard}>
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              Alert.alert(
                'Keamanan Akun',
                'Kata sandi dan token JWT disimpan secara terenkripsi menggunakan Expo SecureStore di level hardware OS.',
              )
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={styles.menuTitle}>Keamanan & Sandi</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textLight}
            />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuItem}
            onPress={() =>
              Alert.alert(
                'Status Database',
                `SQLite lokal terdeteksi aktif dengan ${locations.length} titik koordinat tersimpan di jejakku.db.`,
              )
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="server-outline"
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={styles.menuTitle}>Database SQLite Lokal</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textLight}
            />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuItem}
            onPress={() =>
              Alert.alert(
                'Tentang Jejakku',
                'Jejakku v1.4.0 — Aplikasi Jurnal Perjalanan Cerdas. Praktikum Pemrograman Mobile Modul 4.',
              )
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={styles.menuTitle}>Tentang Jejakku</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textLight}
            />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.signOutText}>Keluar dari Akun</Text>
        </Pressable>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 120,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  identityCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
  },
  verifiedDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#38A169',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  badgePill: {
    backgroundColor: '#F5EFE6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A5A2B',
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: colors.primary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E7EDE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 62,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FDF2F2',
    borderWidth: 1,
    borderColor: '#F8B4B4',
    paddingVertical: 14,
    borderRadius: 16,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.danger,
  },
});
