import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ActivityCard from '../components/ActivityCard';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = useMemo(() => {
    const list = Array.from(new Set(activities.map((item) => item.category)));
    return ['Semua', ...list];
  }, []);

  const filteredActivities = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return activities.filter((item) => {
      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      const matchQuery =
        trimmed === '' ||
        item.place.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed) ||
        (item.note && item.note.toLowerCase().includes(trimmed));

      return matchCategory && matchQuery;
    });
  }, [query, selectedCategory]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Kembali"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </Pressable>

          <View style={styles.headerTexts}>
            <Text style={styles.title}>Jelajah & Cari</Text>
            <Text style={styles.subtitle}>Temukan jejak tempat dan catatan perjalanan</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={19} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari tempat, catatan, atau kategori..."
            placeholderTextColor={colors.textLight}
            style={styles.input}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color={colors.textLight} />
            </Pressable>
          )}
        </View>

        <View style={styles.categoriesRow}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => {
              const active = item === selectedCategory;
              return (
                <Pressable
                  onPress={() => setSelectedCategory(item)}
                  style={[
                    styles.categoryChip,
                    active && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.resultHeader}>
            <Text style={styles.resultCount}>
              {filteredActivities.length} jejak ditemukan
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => router.push(`/activity/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Tidak Ditemukan"
            message={`Tidak ada jejak yang cocok dengan kata kunci "${query}".`}
          />
        }
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTexts: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#26332E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },
  clearButton: {
    padding: 2,
    marginLeft: 6,
  },
  categoriesRow: {
    marginTop: 14,
    marginBottom: 4,
  },
  categoriesList: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 110,
  },
  resultHeader: {
    marginBottom: 12,
    marginTop: 4,
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
