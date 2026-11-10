import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { colors } from '../constants/colors';
import { listLocations } from '../services/databaseService';
import type { SavedLocation } from '../types/location';

export default function TimelineScreen() {
  const router = useRouter();
  const [items, setItems] = useState<SavedLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => { setLoading(true); listLocations().then(setItems).catch(() => setItems([])).finally(() => setLoading(false)); }, []);
  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  return <SafeAreaView style={styles.screen}>
    <FlatList data={items} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.content}
      ListHeaderComponent={<><Text style={styles.eyebrow}>ARSIP PERJALANAN</Text><Text style={styles.title}>Jejak waktumu</Text><Text style={styles.subtitle}>Semua tempat yang kamu simpan akan muncul di sini.</Text></>}
      ListEmptyComponent={<View style={styles.empty}><Ionicons name="map-outline" size={40} color={colors.textLight}/><Text style={styles.emptyTitle}>{loading ? 'Memuat jejak...' : 'Belum ada jejak'}</Text><Text style={styles.emptyText}>Catat lokasi manual atau mulai perjalanan otomatis untuk mengisi riwayat.</Text><Pressable style={styles.button} onPress={() => router.push('/record')}><Text style={styles.buttonText}>Catat lokasi pertama</Text></Pressable></View>}
      renderItem={({item}) => <Pressable onPress={() => router.push(`/activity/${item.id}`)} style={styles.card}><View style={styles.icon}><Ionicons name="location" size={20} color={colors.primary}/></View><View style={{flex:1}}><Text style={styles.place}>{item.placeName}</Text><Text style={styles.area}>{item.area} · {item.source === 'manual' ? 'Manual' : 'Otomatis'}</Text><Text style={styles.address} numberOfLines={2}>{item.displayName}</Text><Text style={styles.date}>{new Date(item.visitedAt).toLocaleString('id-ID')}</Text>{!!item.note && <Text style={styles.note}>“{item.note}”</Text>}</View><Ionicons name="chevron-forward" size={18} color={colors.textLight}/></Pressable>}
    />
    <BottomNav />
  </SafeAreaView>;
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:colors.background},content:{padding:22,paddingBottom:120,flexGrow:1},eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.5,color:colors.primary},title:{fontSize:28,fontWeight:'900',color:colors.text,marginTop:7},subtitle:{fontSize:13,color:colors.textSecondary,marginTop:7,marginBottom:22,lineHeight:19},card:{flexDirection:'row',gap:12,backgroundColor:colors.surface,borderRadius:18,padding:14,borderWidth:1,borderColor:colors.border,marginBottom:10},icon:{width:42,height:42,borderRadius:14,backgroundColor:'#E7EDE2',alignItems:'center',justifyContent:'center'},place:{fontSize:14,fontWeight:'800',color:colors.text},area:{fontSize:11,color:colors.primary,marginTop:3,fontWeight:'700'},address:{fontSize:11,lineHeight:17,color:colors.textSecondary,marginTop:6},date:{fontSize:10,color:colors.textLight,marginTop:7},note:{fontSize:11,color:colors.text,marginTop:7,fontStyle:'italic'},empty:{alignItems:'center',padding:25,marginTop:30,backgroundColor:colors.surface,borderRadius:20},emptyTitle:{fontSize:17,fontWeight:'800',color:colors.text,marginTop:12},emptyText:{fontSize:12,lineHeight:19,textAlign:'center',color:colors.textSecondary,marginTop:6},button:{backgroundColor:colors.primary,padding:13,borderRadius:13,marginTop:17},buttonText:{color:'#fff',fontWeight:'800',fontSize:12}});
