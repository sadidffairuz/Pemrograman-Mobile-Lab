import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import EmptyState from '../../components/EmptyState';
import { activities } from '../../data/activities';
import { colors } from '../../constants/colors';
import { commonStyles } from '../../styles/commonStyles';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const activity = activities.find(
    (item) => item.id === id
  );

  if (!activity) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <View
          role="main"
          style={[
            commonStyles.container,
            {
              flex: 1,
              justifyContent: 'center',
            },
          ]}
        >
          <EmptyState
            title="Jejak tidak ditemukan"
            message="Data aktivitas tersebut belum tersedia."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.container} role="main">
          <Pressable
            role="button"
            accessibilityLabel="Kembali"
            onPress={() => router.back()}
            style={{
              width: 45,
              height: 45,
              borderRadius: 15,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={colors.text}
            />
          </Pressable>

          <View style={{ alignItems: 'center' }} role="region" aria-label="Informasi Tempat">
            <View
              role="img"
              aria-label={`Ikon ${activity.category}`}
              style={{
                width: 85,
                height: 85,
                borderRadius: 28,
                backgroundColor: '#EEF0FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 42 }}>
                {activity.icon}
              </Text>
            </View>

            <Text
              role="heading"
              aria-level={1}
              style={{
                marginTop: 18,
                fontSize: 28,
                fontWeight: '800',
                color: colors.text,
              }}
            >
              {activity.place}
            </Text>

            <Text
              role="status"
              style={{
                marginTop: 5,
                color: colors.primary,
                fontWeight: '700',
              }}
            >
              {activity.category}
            </Text>
          </View>

          <View
            role="region"
            aria-label="Rincian Waktu"
            style={[
              commonStyles.card,
              commonStyles.shadow,
              { marginTop: 30 },
            ]}
          >
            <Text
              role="note"
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: colors.textLight,
              }}
            >
              WAKTU
            </Text>

            <Text
              role="heading"
              aria-level={2}
              style={{
                fontSize: 21,
                fontWeight: '800',
                color: colors.text,
                marginTop: 5,
              }}
            >
              {activity.startTime} — {activity.endTime}
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                marginVertical: 20,
              }}
            />

            <Text
              role="note"
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: colors.textLight,
              }}
            >
              DURASI
            </Text>

            <Text
              role="status"
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: colors.text,
                marginTop: 5,
              }}
            >
              {activity.duration}
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                marginVertical: 20,
              }}
            />

            <Text
              role="note"
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: colors.textLight,
              }}
            >
              TANGGAL
            </Text>

            <Text
              role="status"
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: colors.text,
                marginTop: 5,
              }}
            >
              {activity.date}
            </Text>
          </View>

          <View
            role="region"
            aria-label="Catatan Perjalanan"
            style={[
              commonStyles.card,
              { marginTop: 15 },
            ]}
          >
            <Text
              role="heading"
              aria-level={2}
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: colors.text,
              }}
            >
              📝 Catatan
            </Text>

            <Text
              role="article"
              style={{
                marginTop: 8,
                lineHeight: 22,
                color: colors.textSecondary,
              }}
            >
              {activity.note ?? 'Tidak ada catatan.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
