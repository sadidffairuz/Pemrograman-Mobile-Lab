import { useRouter } from 'expo-router';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import ActivityCard from '../components/ActivityCard';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import SectionTitle from '../components/SectionTitle';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';
import { commonStyles } from '../styles/commonStyles';

export default function TimelineScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={commonStyles.screen}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          commonStyles.container,
          commonStyles.scrollContent,
        ]}
        ListHeaderComponent={
          <View>
            <Text style={commonStyles.title}>
              Timeline
            </Text>

            <Text style={commonStyles.subtitle}>
              Lihat kembali perjalananmu dari waktu ke waktu.
            </Text>

            <View style={commonStyles.section}>
              <SectionTitle
                title="Jejak Aktivitas"
                subtitle="5 Oktober 2026"
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <ActivityCard
              activity={item}
              onPress={() =>
                router.push(`/activity/${item.id}`)
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="Belum ada jejak"
            message="Aktivitasmu akan muncul di sini."
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <BottomNav />
    </SafeAreaView>
  );
}