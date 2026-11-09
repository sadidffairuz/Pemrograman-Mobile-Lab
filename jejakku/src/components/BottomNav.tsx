import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface NavItem {
  label: string;
  route: '/' | '/timeline' | '/search' | '/profile';
  icon: IoniconName;
  activeIcon: IoniconName;
}

const navItems: NavItem[] = [
  { label: 'Beranda', route: '/', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Jejak', route: '/timeline', icon: 'map-outline', activeIcon: 'map' },
  { label: 'Cari', route: '/search', icon: 'search-outline', activeIcon: 'search' },
  { label: 'Profil', route: '/profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View role="navigation" aria-label="Navigasi Utama" style={styles.container}>
      <View role="tablist" style={styles.nav}>
        {navItems.map((item) => {
          const active = item.route === '/' ? pathname === '/' : pathname === item.route || (item.route === '/timeline' && pathname.startsWith('/activity'));
          return (
            <Pressable
              key={item.route}
              role="tab"
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Menu ${item.label}`}
              onPress={() => router.push(item.route)}
              style={({ pressed }: { pressed: boolean }) => [styles.item, pressed && styles.pressed]}
            >
              <View style={[styles.iconWrap, active && styles.activeIconWrap]}>
                <Ionicons name={active ? item.activeIcon : item.icon} size={20} color={active ? colors.white : colors.textLight} />
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 14, paddingBottom: 12, paddingTop: 8 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 23, paddingVertical: 8, paddingHorizontal: 4, borderWidth: 1, borderColor: colors.border, shadowColor: '#26332E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 14, elevation: 6 },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 2 },
  pressed: { transform: [{ scale: 0.95 }] },
  iconWrap: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activeIconWrap: { backgroundColor: colors.primary },
  label: { fontSize: 10, marginTop: 2, color: colors.textLight, fontWeight: '700' },
  activeLabel: { color: colors.primary, fontWeight: '900' },
});
