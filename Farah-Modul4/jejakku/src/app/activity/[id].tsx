import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { getCloudLocationById } from '../../services/locationService';
import type { SavedLocation } from '../../types/location';
import {
  updateCloudLocationNote,
  deleteCloudLocation,
} from '../../services/locationService';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [location, setLocation] = useState<SavedLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedNote, setEditedNote] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getCloudLocationById(Number(id))
      .then((data) => {
        setLocation(data);
        setEditedNote(data.note ?? '');
      })
      .catch(() => setLocation(null))
      .finally(() => setLoading(false));
  }, [id]);
  const saveNote = async () => {
    if (!location) return;

    setSaving(true);

    try {
      await updateCloudLocationNote(location.id, editedNote);

      setLocation({
        ...location,
        note: editedNote.trim() || null,
      });

      Alert.alert('Berhasil', 'Catatan lokasi berhasil diperbarui.');
    } catch (error) {
      Alert.alert(
        'Gagal',
        error instanceof Error
          ? error.message
          : 'Catatan gagal diperbarui.',
      );
    } finally {
      setSaving(false);
    }
  };
  const deleteLocation = () => {
    if (!location) return;

    Alert.alert(
      'Hapus jejak?',
      `Apakah kamu yakin ingin menghapus ${location.placeName}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCloudLocation(location.id);

              Alert.alert(
                'Berhasil',
                'Jejak berhasil dihapus.',
                [
                  {
                    text: 'OK',
                    onPress: () => router.replace('/timeline'),
                  },
                ],
              );
            } catch (error) {
              Alert.alert(
                'Gagal menghapus',
                error instanceof Error
                  ? error.message
                  : 'Terjadi kesalahan saat menghapus jejak.',
              );
            }
          },
        },
      ],
    );
  };
  if (loading || !location)
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.center}>
          <Text style={styles.title}>
            {loading ? 'Memuat jejak...' : 'Jejak tidak ditemukan'}
          </Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Kembali</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={21} color={colors.text} />
        </Pressable>
        <View style={styles.hero}>
          <View style={styles.pin}>
            <Ionicons name="location" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>{location.placeName}</Text>
          <Text style={styles.area}>{location.area}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>ALAMAT</Text>
          <Text style={styles.value}>{location.displayName}</Text>
          <Text style={styles.label}>KOORDINAT</Text>
          <Text style={styles.value}>
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
          <Text style={styles.label}>WAKTU DICATAT</Text>
          <Text style={styles.value}>
            {new Date(location.visitedAt).toLocaleString('id-ID')}
          </Text>
          <Text style={styles.label}>SUMBER</Text>
          <Text style={styles.value}>
            {location.source === 'manual'
              ? 'Pencatatan manual'
              : 'Pelacakan otomatis'}
          </Text>
          <Text style={styles.label}>CATATAN</Text>
          <TextInput
            style={styles.noteInput}
            value={editedNote}
            onChangeText={setEditedNote}
            placeholder="Tambahkan catatan perjalanan..."
            multiline
            textAlignVertical="top"
          />
          <Pressable
            style={[styles.button, saving && { opacity: 0.6 }]}
            onPress={saveNote}
            disabled={saving}
          >
            <Ionicons name="save-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>
              {saving ? 'Menyimpan...' : 'Simpan perubahan'}
            </Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={deleteLocation}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Hapus jejak</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.button}
          onPress={() =>
            Linking.openURL(
              `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=18/${location.latitude}/${location.longitude}`,
            )
          }
        >
          <Ionicons name="map-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Buka di OpenStreetMap</Text>
        </Pressable>
        <Text style={styles.attribution}>© OpenStreetMap contributors</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 40 },
  back: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  hero: { alignItems: 'center', marginBottom: 22 },
  pin: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#E7EDE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.text,
    marginTop: 14,
    textAlign: 'center',
  },
  area: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textLight,
    marginTop: 16,
  },
  value: { fontSize: 13, lineHeight: 20, color: colors.text, marginTop: 6 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 15,
    marginTop: 17,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800' },
  attribution: {
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 15,
  },
  noteInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
    fontSize: 13,
    color: colors.text,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#C0392B',
    borderRadius: 15,
    padding: 15,
    marginTop: 12,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  link: { color: colors.primary, fontWeight: '800', marginTop: 15 },
});
