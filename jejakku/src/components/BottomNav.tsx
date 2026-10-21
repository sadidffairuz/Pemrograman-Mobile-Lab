import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type Route = '/' | '/search' | '/timeline' | '/stats';
interface NavItem { label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap; route: Route; }
const navItems: NavItem[] = [
  { label: 'Home', icon: 'home-outline', activeIcon: 'home', route: '/' },
  { label: 'Jelajah', icon: 'compass-outline', activeIcon: 'compass', route: '/search' },
  { label: 'Jurnal', icon: 'book-outline', activeIcon: 'book', route: '/timeline' },
  { label: 'Statistik', icon: 'stats-chart-outline', activeIcon: 'stats-chart', route: '/stats' },
];
export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {navItems.map((item) => {
          const active = item.route === '/' ? pathname === '/' : pathname === item.route || (item.route === '/timeline' && pathname.startsWith('/activity'));
          return (
            <Pressable key={item.route} onPress={() => router.push(item.route)} style={({ pressed }: { pressed: boolean }) => [styles.item, pressed && styles.pressed]}>
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
  item: { alignItems: 'center', justifyContent: 'center', flex: 1, paddingVertical: 2 },
  iconWrap: { width: 34, height: 29, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  activeIconWrap: { backgroundColor: colors.primary },
  pressed: { opacity: 0.65, transform: [{ scale: 0.97 }] },
  label: { marginTop: 3, fontSize: 10, fontWeight: '600', color: colors.textLight },
  activeLabel: { color: colors.primary, fontWeight: '800' },
});
