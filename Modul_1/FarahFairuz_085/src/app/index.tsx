import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import ActivityCard from '../components/ActivityCard';
import BottomNav from '../components/BottomNav';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';
import { commonStyles } from '../styles/commonStyles';

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';

  return 'Selamat malam';
};

const getActivityCount = (): number => {
  return activities.filter(
    (activity) => activity.date === '5 Oktober 2026'
  ).length;
};

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isWideScreen = width >= 700;

  const todayActivities = activities.filter(
    (activity) => activity.date === '5 Oktober 2026'
  );

  const greeting = getGreeting();
  const activityCount = getActivityCount();

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            commonStyles.container,
            isWideScreen && { paddingHorizontal: 40 },
          ]}
        >
          {/* HEADER */}
          <View style={commonStyles.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    fontWeight: '800',
                    letterSpacing: 1,
                  }}
                >
                  JEJAKKU
                </Text>

                <Text style={commonStyles.title}>
                  {greeting} 👋
                </Text>

                <Text style={commonStyles.subtitle}>
                  Ingat kembali jejakmu hari ini.
                </Text>
              </View>

              <Pressable
                onPress={() => router.push('/search')}
                style={({ pressed }) => [
                  {
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    backgroundColor: colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={21}
                  color={colors.text}
                />
              </Pressable>
            </View>
          </View>

          {/* SUMMARY */}
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 25,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                color: '#DDE1FF',
                fontSize: 13,
                fontWeight: '700',
              }}
            >
              JEJAKMU HARI INI
            </Text>

            <Text
              style={{
                color: colors.white,
                fontSize: 24,
                fontWeight: '800',
                marginTop: 5,
              }}
            >
              {activityCount} aktivitas terekam ✨
            </Text>

            <Text
              style={{
                color: '#E7E9FF',
                fontSize: 13,
                marginTop: 6,
              }}
            >
              Setiap tempat punya cerita.
            </Text>
          </View>

          {/* STATS */}
          <View
            style={{
              flexDirection: isWideScreen ? 'row' : 'row',
              gap: 10,
            }}
          >
            <StatCard
              icon="📍"
              value="5"
              label="tempat"
            />

            <StatCard
              icon="🚶"
              value={`${activityCount}`}
              label="aktivitas"
            />

            <StatCard
              icon="⏱️"
              value="7j 20m"
              label="di luar"
            />
          </View>

          {/* RECENT */}
          <View style={commonStyles.section}>
            <SectionTitle
              title="Aktivitas Terbaru"
              subtitle="Jejak yang baru saja kamu lalui"
            />

            {todayActivities.length > 0 ? (
              <>
                {todayActivities.slice(0, 4).map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onPress={() =>
                      router.push(`/activity/${activity.id}`)
                    }
                  />
                ))}

                <Pressable
                  onPress={() => router.push('/timeline')}
                  style={({ pressed }) => [
                    commonStyles.button,
                    commonStyles.buttonPrimary,
                    { marginTop: 5 },
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text style={commonStyles.buttonText}>
                    Lihat semua jejak →
                  </Text>
                </Pressable>
              </>
            ) : (
              <Text style={commonStyles.subtitle}>
                Belum ada aktivitas hari ini.
              </Text>
            )}
          </View>

          {/* MEMORY */}
          <View style={[commonStyles.card, { marginTop: 25 }]}>
            <Text style={{ fontSize: 28 }}>💭</Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: '800',
                color: colors.text,
              }}
            >
              Mau mengingat sesuatu?
            </Text>

            <Text
              style={{
                marginTop: 5,
                lineHeight: 20,
                color: colors.textSecondary,
              }}
            >
              Cari tempat yang pernah kamu kunjungi dan
              lihat kembali jejaknya.
            </Text>

            <Pressable
              onPress={() => router.push('/search')}
              style={({ pressed }) => [
                commonStyles.button,
                {
                  marginTop: 15,
                  backgroundColor: '#EEF0FF',
                },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: '800',
                }}
              >
                Cari memoriku 🔎
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}