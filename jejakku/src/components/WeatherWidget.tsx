import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { ambilDataCuacaLive } from '../services/api';
import { DataCuaca } from '../types/api';
import { colors } from '../constants/colors';

export default function WeatherWidget() {
  const [dataCuaca, setDataCuaca] = useState<DataCuaca | null>(null);
  const [sedangMemuat, setSedangMemuat] = useState<boolean>(true);
  const [pesanError, setPesanError] = useState<string | null>(null);

  const muatDataCuaca = () => {
    setSedangMemuat(true);
    setPesanError(null);

    ambilDataCuacaLive()
      .then((data) => {
        setDataCuaca(data);
        setSedangMemuat(false);
      })
      .catch((error: Error) => {
        setPesanError(error.message);
        setSedangMemuat(false);
      });
  };

  useEffect(() => {
    muatDataCuaca();
  }, []);

  return (
    <View role="region" aria-label="Informasi Cuaca Perjalanan" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.locationTag} role="status">
          <Ionicons name="location-sharp" size={14} color={colors.primary} />
          <Text style={styles.locationText}>{dataCuaca ? dataCuaca.kota : 'Memeriksa lokasi...'}</Text>
        </View>

        <Pressable
          role="button"
          accessibilityLabel="Muat ulang cuaca"
          onPress={muatDataCuaca}
          style={({ pressed }) => [styles.refreshButton, pressed && styles.refreshPressed]}
        >
          <Feather name="refresh-cw" size={13} color={colors.textSecondary} />
        </Pressable>
      </View>

      {sedangMemuat ? (
        <View role="status" style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>Menghubungkan satelit cuaca...</Text>
        </View>
      ) : pesanError ? (
        <View role="alert" style={styles.errorContainer}>
          <Ionicons name="cloud-offline-outline" size={20} color={colors.danger} />
          <Text style={styles.errorText}>Mode Offline · Suhu perkiraan 27°C</Text>
        </View>
      ) : dataCuaca ? (
        <View style={styles.weatherContent}>
          <View style={styles.tempBlock}>
            <Text role="heading" aria-level={2} style={styles.tempText}>
              {dataCuaca.suhu}°C
            </Text>
            <View style={styles.conditionBlock}>
              <Text style={styles.conditionText}>{dataCuaca.kondisi}</Text>
              <Text role="note" style={styles.windText}>
                Angin: {dataCuaca.kecepatanAngin} km/jam
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#26332E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF0E8',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  refreshButton: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#F5F2EB',
  },
  refreshPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.94 }],
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tempBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tempText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  conditionBlock: {
    justifyContent: 'center',
  },
  conditionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  windText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

