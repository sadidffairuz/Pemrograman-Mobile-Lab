import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Route = '/' | '/timeline' | '/stats';

interface NavItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Route;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    icon: 'home-outline',
    route: '/',
  },
  {
    label: 'Timeline',
    icon: 'calendar-outline',
    route: '/timeline',
  },
  {
    label: 'Statistik',
    icon: 'stats-chart-outline',
    route: '/stats',
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.route;

          return (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={23}
                color={active ? '#5B6CFF' : '#A4A9B8'}
              />

              <Text
                style={[
                  styles.label,
                  active && styles.activeLabel,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    paddingVertical: 4,
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#A4A9B8',
  },

  activeLabel: {
    color: '#5B6CFF',
    fontWeight: '800',
  },
});