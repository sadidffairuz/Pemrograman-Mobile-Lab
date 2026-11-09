import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import WeatherWidget from '../components/WeatherWidget';
import { activities } from '../data/activities';
import { colors } from '../constants/colors';

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
};

export default function HomeScreen() {
  const router = useRouter();
  const recentActivities = [...activities].slice(0, 3);
  const totalPlaces = new Set(activities.map((item) => item.place)).size;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.page} role="main">
          <View style={styles.topRow} role="banner">
            <View style={styles.brandRow}>
              <View style={styles.brandIcon} role="img" aria-label="Logo jejakku">
                <Ionicons name="map" size={21} color={colors.white} />
              </View>
              <Text style={styles.brand} role="heading" aria-level={1}>
                jejakku<Text style={styles.brandDot}>.</Text>
              </Text>
            </View>
            <Pressable
              role="button"
              accessibilityLabel="Buka profil"
              onPress={() => router.push('/profile')}
              style={styles.avatar}
            >
              <Ionicons name="person-outline" size={21} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.greetingBlock} role="region" aria-label="Salam pembuka">
            <Text style={styles.eyebrow} role="note">RUANG KECIL UNTUK CERITAMU</Text>
            <Text style={styles.heading} role="heading" aria-level={2}>{greeting()} 👋</Text>
            <Text style={styles.subheading} role="note">Setiap tempat punya cerita. Yuk, simpan jejakmu.</Text>
          </View>

          <WeatherWidget />

          <View style={styles.summaryCard} role="region" aria-label="Ringkasan Perjalanan">
            <View style={styles.summaryTop} role="status">
              <View style={styles.liveDot} />
              <Text style={styles.summaryEyebrow}>RINGKASAN PERJALANAN</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="sparkles-outline" size={20} color="#F5C59E" />
            </View>
            <View style={styles.summaryNumbers}>
              <View style={styles.summaryMetric}>
                <Text style={styles.summaryValue}>{totalPlaces}</Text>
                <Text style={styles.summaryLabel}>tempat disimpan</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryMetric}>
                <Text style={styles.summaryValue}>{activities.length}</Text>
                <Text style={styles.summaryLabel}>cerita perjalanan</Text>
              </View>
            </View>
            <Text style={styles.summaryFoot} role="note">Koleksi tempat yang pernah kamu singgahi.</Text>
            <View style={styles.summaryDecoration} role="img">
              <Ionicons name="navigate" size={54} color="rgba(255,255,255,0.08)" />
            </View>
          </View>

          <View style={styles.sectionHeader} role="region" aria-label="Peta jejak header">
            <View>
              <Text style={styles.sectionTitle} role="heading" aria-level={2}>Peta jejakmu</Text>
              <Text style={styles.sectionSubtitle} role="note">Tempat-tempat yang pernah kamu datangi</Text>
            </View>
            <Pressable role="button" aria-label="Jelajah peta" onPress={() => router.push('/search')} style={styles.textLink}>
              <Text style={styles.textLinkLabel}>Jelajah</Text>
              <Ionicons name="arrow-forward" size={15} color={colors.primary} />
            </Pressable>
          </View>

          <Pressable role="button" aria-label="Buka peta perjalanan" onPress={() => router.push('/search')} style={styles.mapCard}>
            <View style={styles.mapBase}>
              <View style={[styles.road, styles.roadOne]} />
              <View style={[styles.road, styles.roadTwo]} />
              <View style={[styles.road, styles.roadThree]} />
              <View style={[styles.park, styles.parkOne]} />
              <View style={[styles.park, styles.parkTwo]} />
              <View style={styles.water} />
              <View style={[styles.mapPin, { left: '27%', top: '30%' }]} role="img">
                <Ionicons name="location" size={19} color={colors.white} />
              </View>
              <View style={[styles.mapPin, styles.mapPinAlt, { left: '62%', top: '51%' }]} role="img">
                <Ionicons name="location" size={18} color={colors.white} />
              </View>
              <View style={styles.mapLabel} role="status">
                <Ionicons name="map-outline" size={14} color={colors.primary} />
                <Text style={styles.mapLabelText}>Peta perjalanan</Text>
              </View>
              <View style={styles.mapHint} role="note">
                <Text style={styles.mapHintText}>Lihat semua lokasi</Text>
                <Feather name="arrow-up-right" size={15} color={colors.primary} />
              </View>
            </View>
          </Pressable>

          <View style={styles.sectionHeader} role="region" aria-label="Jejak terbaru header">
            <View>
              <Text style={styles.sectionTitle} role="heading" aria-level={2}>Jejak terbaru</Text>
              <Text style={styles.sectionSubtitle} role="note">Kenangan yang baru kamu catat</Text>
            </View>
            <Pressable role="button" aria-label="Lihat semua jejak" onPress={() => router.push('/timeline')} style={styles.textLink}>
              <Text style={styles.textLinkLabel}>Semua</Text>
              <Ionicons name="arrow-forward" size={15} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.activityList} role="region" aria-label="Daftar jejak terbaru">
            {recentActivities.map((activity, index) => (
              <Pressable
                key={activity.id}
                role="article"
                aria-label={`Jejak di ${activity.place}`}
                onPress={() => router.push(`/activity/${activity.id}`)}
                style={({ pressed }) => [styles.activityCard, pressed && { opacity: 0.75 }]}
              >
                <View style={[styles.activityIcon, index === 1 && styles.activityIconSage, index === 2 && styles.activityIconPeach]} role="img">
                  <Text style={styles.activityEmoji}>{activity.icon}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName} role="heading" aria-level={3}>{activity.place}</Text>
                  <Text style={styles.activityMeta} role="note">{activity.category} · {activity.startTime}</Text>
                </View>
                <Ionicons name="chevron-forward" size={19} color={colors.textLight} />
              </Pressable>
            ))}
            {recentActivities.length === 0 && (
              <Text style={styles.emptyText} role="status">Belum ada jejak. Tambahkan tempat pertamamu!</Text>
            )}
          </View>

          <Pressable
            role="button"
            aria-label="Simpan jejak baru"
            onPress={() => router.push('/search')}
            style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.8 }]}
          >
            <View style={styles.addIcon} role="img">
              <Ionicons name="add" size={23} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addTitle} role="heading" aria-level={3}>Simpan jejak baru</Text>
              <Text style={styles.addSubtitle} role="note">Catat tempat, foto, dan ceritamu</Text>
            </View>
            <Feather name="arrow-up-right" size={20} color={colors.primary} />
          </Pressable>
          <Text style={styles.footerNote} role="note">Dibuat dari perjalananmu, disimpan untuk dikenang. ✦</Text>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 112 },
  page: { paddingHorizontal: 22, paddingTop: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  brand: { color: colors.text, fontSize: 23, fontWeight: '900', letterSpacing: -0.8 },
  brandDot: { color: colors.accent },
  avatar: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  greetingBlock: { marginTop: 27, marginBottom: 20 },
  eyebrow: { color: colors.primary, fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginBottom: 7 },
  heading: { fontSize: 29, color: colors.text, fontWeight: '800', letterSpacing: -0.8 },
  subheading: { marginTop: 6, color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  summaryCard: { backgroundColor: colors.primary, borderRadius: 25, padding: 20, overflow: 'hidden', marginBottom: 27 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#E9A16A' },
  summaryEyebrow: { color: '#DDE8DA', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  summaryNumbers: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 16 },
  summaryMetric: { flex: 1 },
  summaryValue: { color: colors.white, fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  summaryLabel: { color: '#DDE8DA', fontSize: 11, marginTop: 2 },
  summaryDivider: { width: 1, height: 45, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 15 },
  summaryFoot: { color: '#E8EEE5', fontSize: 11, marginTop: 2 },
  summaryDecoration: { position: 'absolute', right: 9, bottom: -7, transform: [{ rotate: '-20deg' }] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  sectionSubtitle: { color: colors.textSecondary, fontSize: 11, marginTop: 4 },
  textLink: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingLeft: 8 },
  textLinkLabel: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  mapCard: { borderRadius: 22, overflow: 'hidden', marginBottom: 27, borderWidth: 1, borderColor: colors.border },
  mapBase: { height: 176, backgroundColor: '#E8E9D9', overflow: 'hidden' },
  road: { position: 'absolute', backgroundColor: '#FFFDF5', borderColor: '#DADCCB', borderWidth: 1, borderRadius: 50 },
  roadOne: { width: '130%', height: 24, left: '-12%', top: '45%', transform: [{ rotate: '-18deg' }] },
  roadTwo: { width: '110%', height: 17, left: '4%', top: '24%', transform: [{ rotate: '48deg' }] },
  roadThree: { width: '100%', height: 14, left: '15%', top: '71%', transform: [{ rotate: '23deg' }] },
  park: { position: 'absolute', backgroundColor: '#C6D6B7', borderRadius: 18 },
  parkOne: { width: 92, height: 48, left: '4%', top: '8%', transform: [{ rotate: '-12deg' }] },
  parkTwo: { width: 72, height: 52, right: '4%', bottom: '7%', transform: [{ rotate: '17deg' }] },
  water: { position: 'absolute', width: 150, height: 20, backgroundColor: '#BDD9D2', borderRadius: 30, right: '-20%', top: '14%', transform: [{ rotate: '55deg' }] },
  mapPin: { position: 'absolute', width: 33, height: 33, borderRadius: 17, backgroundColor: colors.primary, borderWidth: 3, borderColor: '#FFFEFA', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  mapPinAlt: { backgroundColor: colors.accent },
  mapLabel: { position: 'absolute', left: 12, top: 12, flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: 'rgba(255,254,250,0.93)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 11 },
  mapLabelText: { color: colors.text, fontSize: 10, fontWeight: '800' },
  mapHint: { position: 'absolute', right: 12, bottom: 12, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.surface, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 11 },
  mapHintText: { color: colors.primary, fontSize: 10, fontWeight: '800' },
  activityList: { gap: 9, marginBottom: 18 },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 12, borderWidth: 1, borderColor: colors.border },
  activityIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#F6E6D7', alignItems: 'center', justifyContent: 'center' },
  activityIconSage: { backgroundColor: '#E1EADD' },
  activityIconPeach: { backgroundColor: '#F5E4DA' },
  activityEmoji: { fontSize: 21 },
  activityInfo: { flex: 1, marginLeft: 12 },
  activityName: { color: colors.text, fontSize: 13, fontWeight: '800' },
  activityMeta: { color: colors.textSecondary, fontSize: 11, marginTop: 5 },
  emptyText: { color: colors.textSecondary, paddingVertical: 16, fontSize: 13 },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E7EDE2', borderWidth: 1, borderColor: '#D5E0D0', padding: 14, borderRadius: 19 },
  addIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  addTitle: { color: colors.primary, fontWeight: '800', fontSize: 13 },
  addSubtitle: { color: colors.textSecondary, fontSize: 10, marginTop: 4 },
  footerNote: { textAlign: 'center', color: colors.textLight, fontSize: 10, marginTop: 23, marginBottom: 10 },
});
