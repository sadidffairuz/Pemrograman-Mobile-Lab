import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type IconName = keyof typeof Ionicons.glyphMap;
const items: { label: string; route: '/' | '/timeline' | '/tracking' | '/profile'; icon: IconName; active: IconName }[] = [
  { label: 'Beranda', route: '/', icon: 'home-outline', active: 'home' },
  { label: 'Jejak', route: '/timeline', icon: 'map-outline', active: 'map' },
  { label: 'Rekam', route: '/tracking', icon: 'navigate-outline', active: 'navigate' },
  { label: 'Profil', route: '/profile', icon: 'person-outline', active: 'person' },
];
export default function BottomNav() {
  const router = useRouter(); const pathname = usePathname();
  return <View style={styles.container}><View style={styles.nav}>{items.map((item) => {
    const selected = pathname === item.route || (item.route === '/timeline' && pathname.startsWith('/activity')) || (item.route === '/tracking' && pathname === '/record');
    return <Pressable key={item.route} onPress={() => router.push(item.route)} style={styles.item} accessibilityRole="tab" accessibilityState={{selected}}>
      <View style={[styles.icon, selected && styles.selected]}><Ionicons name={selected ? item.active : item.icon} size={19} color={selected ? colors.white : colors.textLight}/></View>
      <Text style={[styles.label,selected && styles.labelSelected]}>{item.label}</Text>
    </Pressable>;
  })}</View></View>;
}
const styles=StyleSheet.create({container:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:14,paddingBottom:12,paddingTop:8},nav:{flexDirection:'row',justifyContent:'space-around',backgroundColor:colors.surface,borderRadius:22,paddingVertical:8,borderWidth:1,borderColor:colors.border,elevation:5},item:{flex:1,alignItems:'center'},icon:{width:34,height:34,borderRadius:12,alignItems:'center',justifyContent:'center'},selected:{backgroundColor:colors.primary},label:{fontSize:10,color:colors.textLight,fontWeight:'700',marginTop:2},labelSelected:{color:colors.primary,fontWeight:'900'}});
