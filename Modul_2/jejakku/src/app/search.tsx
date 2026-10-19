import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';

import ActivityCard from '../components/ActivityCard';
import EmptyState from '../components/EmptyState';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';
import { commonStyles } from '../styles/commonStyles';

const searchActivities = (
  keyword: string
) => {
  const normalizedKeyword = keyword
    .trim()
    .toLowerCase();

  if (!normalizedKeyword) {
    return [];
  }

  return activities.filter((activity) =>
    activity.place
      .toLowerCase()
      .includes(normalizedKeyword)
  );
};

export default function SearchScreen() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const results = searchActivities(keyword);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={commonStyles.container}>
          <Pressable
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
              marginBottom: 22,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={colors.text}
            />
          </Pressable>

          <Text style={commonStyles.title}>
            Cari Memori
          </Text>

          <Text style={commonStyles.subtitle}>
            Kapan terakhir kamu berada di suatu tempat?
          </Text>

          <View
            style={{
              marginTop: 22,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textLight}
              style={{
                position: 'absolute',
                left: 16,
                zIndex: 1,
              }}
            />

            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="Cari tempat..."
              placeholderTextColor={colors.textLight}
              style={[
                commonStyles.input,
                { flex: 1, paddingLeft: 48 },
              ]}
              autoCapitalize="words"
            />
          </View>

          <View style={commonStyles.section}>
            {keyword.trim() === '' ? (
              <View style={commonStyles.card}>
                <Text style={{ fontSize: 30 }}>
                  💭
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 17,
                    fontWeight: '800',
                    color: colors.text,
                  }}
                >
                  Mulai mencari
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    lineHeight: 20,
                    color: colors.textSecondary,
                  }}
                >
                  Coba cari “Kampus”, “Kantin”, atau
                  “Perpustakaan”.
                </Text>
              </View>
            ) : results.length > 0 ? (
              <>
                <Text
                  style={{
                    marginBottom: 13,
                    color: colors.textSecondary,
                  }}
                >
                  Ditemukan {results.length} jejak
                </Text>

                {results.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onPress={() =>
                      router.push(`/activity/${activity.id}`)
                    }
                  />
                ))}
              </>
            ) : (
              <EmptyState
                title="Memori tidak ditemukan"
                message={`Belum ada jejak untuk “${keyword}”.`}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}