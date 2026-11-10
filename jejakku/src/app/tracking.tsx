import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';
import { useJourneyTracking } from '../hooks/useJourneyTracking';
import { getActiveJourney } from '../services/databaseService';

export default function TrackingScreen() {
  const router = useRouter();
  const { isTracking, lastCoordinates, message, start, stop } = useJourneyTracking();
  const [existingSession, setExistingSession] = useState(false);
  useEffect(() => { getActiveJourney().then((journey) => setExistingSession(!!journey)).catch(() => undefined); }, []);

  const begin = async () => {
    try { await start(); setExistingSession(false); }
    catch (error) { Alert.alert('Tidak dapat memulai', error instanceof Error ? error.message : 'Periksa izin GPS.'); }
  };
  const end = async () => {
    await stop(); setExistingSession(false);
    Alert.alert('Perjalanan selesai', 'Sesi perjalanan telah ditutup.');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.text}/></Pressable>
        <Text style={styles.eyebrow}>MODE OTOMATIS</Text>
        <Text style={styles.title}>Rekam perjalanan</Text>
        <Text style={styles.subtitle}>Jejakku merekam titik GPS saat kamu berpindah. Untuk versi ini, pelacakan aktif selama aplikasi tetap terbuka.</Text>
        <View style={styles.statusCard}>
          <View style={[styles.statusIcon, isTracking && styles.statusActive]}><Ionicons name="navigate" size={30} color={isTracking ? '#fff' : colors.primary}/></View>
          <Text style={styles.statusTitle}>{isTracking ? 'Perjalanan sedang direkam' : 'Belum ada perjalanan aktif'}</Text>
          <Text style={styles.statusMessage}>{message}</Text>
          {lastCoordinates && <View style={styles.coords}><Text style={styles.coordsText}>GPS {lastCoordinates.latitude.toFixed(6)}, {lastCoordinates.longitude.toFixed(6)}</Text><Text style={styles.accuracy}>Akurasi ±{Math.round(lastCoordinates.accuracy ?? 0)} m</Text></View>}
          {isTracking ? <Pressable style={styles.stopButton} onPress={end}><Ionicons name="stop-circle" size={19} color="#fff"/><Text style={styles.buttonText}>Akhiri Perjalanan</Text></Pressable> : <Pressable style={styles.startButton} onPress={begin}><Ionicons name="play-circle" size={19} color="#fff"/><Text style={styles.buttonText}>Mulai Perjalanan</Text></Pressable>}
        </View>
        {existingSession && !isTracking && <View style={styles.warning}><Text style={styles.warningText}>Ada sesi aktif dari penggunaan sebelumnya. Versi ini tidak melanjutkan sesi lama otomatis. Mulai ulang aplikasi tidak akan meneruskan GPS lama.</Text></View>}
        <View style={styles.infoCard}><Text style={styles.infoTitle}>Cara kerja pencatatan otomatis</Text><Text style={styles.infoText}>• GPS diperiksa sekitar setiap 12 detik atau setelah berpindah 15 meter.</Text><Text style={styles.infoText}>• Titik disimpan jika perpindahan minimal 20 meter dan akurasi GPS memadai.</Text><Text style={styles.infoText}>• Nominatim diminta hanya untuk lokasi yang cukup berjauhan (sekitar 250 meter) dan dibatasi intervalnya.</Text><Text style={styles.infoText}>• Mode ini belum berjalan ketika aplikasi ditutup atau masuk background.</Text></View>
        <Text style={styles.attribution}>Alamat diproses oleh © OpenStreetMap contributors.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 40 },
  back: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  eyebrow: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, color: colors.primary },
  title: { fontSize: 28, fontWeight: '900', color: colors.text, marginTop: 7 },
  subtitle: { fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: 7, marginBottom: 22 },
  statusCard: { backgroundColor: colors.surface, borderRadius: 23, padding: 20, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statusIcon: { width: 64, height: 64, borderRadius: 21, backgroundColor: '#E7EDE2', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  statusActive: { backgroundColor: colors.success },
  statusTitle: { fontSize: 18, fontWeight: '900', color: colors.text, textAlign: 'center' },
  statusMessage: { fontSize: 12, lineHeight: 18, color: colors.textSecondary, textAlign: 'center', marginTop: 8 },
  coords: { backgroundColor: '#F3F5EF', borderRadius: 12, padding: 12, width: '100%', marginTop: 16, alignItems: 'center' },
  coordsText: { fontSize: 11, fontWeight: '700', color: colors.primary },
  accuracy: { fontSize: 10, color: colors.textSecondary, marginTop: 4 },
  startButton: { backgroundColor: colors.primary, borderRadius: 15, padding: 15, marginTop: 20, width: '100%', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' },
  stopButton: { backgroundColor: colors.danger, borderRadius: 15, padding: 15, marginTop: 20, width: '100%', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '800' },
  warning: { backgroundColor: '#FFF2DC', borderRadius: 14, padding: 13, marginTop: 15 },
  warningText: { fontSize: 11, lineHeight: 17, color: '#805A22' },
  infoCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 17, marginTop: 17, borderWidth: 1, borderColor: colors.border },
  infoTitle: { fontSize: 14, fontWeight: '800', color: colors.text, marginBottom: 10 },
  infoText: { fontSize: 12, lineHeight: 19, color: colors.textSecondary, marginTop: 5 },
  attribution: { fontSize: 10, color: colors.textLight, textAlign: 'center', marginTop: 17 },
});
