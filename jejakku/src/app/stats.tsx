import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import SectionTitle from '../components/SectionTitle';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';
import { commonStyles } from '../styles/commonStyles';

const getVisitCount = (place: string): number => {
  return activities.filter(
    (activity) => activity.place === place
  ).length;
};

const getPlaces = (): string[] => {
  return Array.from(
    new Set(
      activities.map((activity) => activity.place)
    )
  );
};

export default function StatsScreen() {
  const router = useRouter();

  const places = getPlaces();

  const placeStats = places
    .map((place) => ({
      place,
      count: getVisitCount(place),
    }))
    .sort((a, b) => b.count - a.count);

  const mostVisited = placeStats[0];

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>
            Statistik
          </Text>

          <Text style={commonStyles.subtitle}>
            Sedikit melihat pola dari jejakmu.
          </Text>

          {/* HIGHLIGHT */}
          {mostVisited && (
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 24,
                padding: 20,
                marginTop: 25,
              }}
            >
              <Text
                style={{
                  color: '#DDE1FF',
                  fontSize: 12,
                  fontWeight: '800',
                }}
              >
                TEMPAT PALING SERING
              </Text>

              <Text
                style={{
                  color: colors.white,
                  fontSize: 25,
                  fontWeight: '800',
                  marginTop: 7,
                }}
              >
                🏆 {mostVisited.place}
              </Text>

              <Text
                style={{
                  color: '#E7E9FF',
                  marginTop: 5,
                }}
              >
                {mostVisited.count} kali tercatat
              </Text>
            </View>
          )}

          {/* VISITS */}
          <View style={commonStyles.section}>
            <SectionTitle
              title="Tempat yang Sering Dikunjungi"
              subtitle="Berdasarkan mock data minggu ini"
            />

            <View style={commonStyles.card}>
              {placeStats.map((item, index) => {
                const percentage =
                  (item.count / placeStats[0].count) * 100;

                return (
                  <View
                    key={item.place}
                    style={{
                      marginBottom:
                        index === placeStats.length - 1
                          ? 0
                          : 22,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '700',
                          color: colors.text,
                        }}
                      >
                        {index + 1}. {item.place}
                      </Text>

                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: '800',
                        }}
                      >
                        {item.count}x
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 9,
                        borderRadius: 10,
                        backgroundColor: '#EEF0F5',
                        overflow: 'hidden',
                      }}
                    >
                      <View
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          backgroundColor: colors.primary,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={[
              commonStyles.card,
              { marginTop: 20 },
            ]}
          >
            <Text style={{ fontSize: 30 }}>
              🧭
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: '800',
                color: colors.text,
              }}
            >
              Jejakmu punya pola
            </Text>

            <Text
              style={{
                marginTop: 5,
                lineHeight: 21,
                color: colors.textSecondary,
              }}
            >
              Statistik ini masih menggunakan data lokal.
              Nantinya dapat dikembangkan menjadi analisis
              otomatis berdasarkan lokasi pengguna.
            </Text>

            <Pressable
              onPress={() => router.push('/timeline')}
              style={({ pressed }) => [
                commonStyles.button,
                commonStyles.buttonPrimary,
                { marginTop: 15 },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={commonStyles.buttonText}>
                Lihat timeline
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}