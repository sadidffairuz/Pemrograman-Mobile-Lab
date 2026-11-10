import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { colors } from '../constants/colors';
import { listLocations, listJourneys } from '../services/databaseService';
import type { SavedLocation, Journey } from '../types/location';

export default function StatsScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  useFocusEffect(useCallback(() => {
    listLocations().then(setLocations).catch(() => setLocations([]));
    listJourneys().then(setJourneys).catch(() => setJourneys([]));
  }, []));
  const counts = new Map<string, number>();
  locations.forEach((item) => counts.set(item.placeName, (counts.get(item.placeName) ?? 0) + 1));
  const places = [...counts.entries()].sort((a,b) => b[1]-a[1]);
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>RINGKASAN AKTIVITAS</Text><Text style={styles.title}>Statistik jejak</Text><Text style={styles.subtitle}>Ringkasan berdasarkan data yang tersimpan di perangkat.</Text>
    <View style={styles.summary}><View style={styles.metric}><Text style={styles.number}>{locations.length}</Text><Text style={styles.metricLabel}>lokasi tercatat</Text></View><View style={styles.metric}><Text style={styles.number}>{journeys.length}</Text><Text style={styles.metricLabel}>sesi perjalanan</Text></View><View style={styles.metric}><Text style={styles.number}>{places.length}</Text><Text style={styles.metricLabel}>tempat berbeda</Text></View></View>
    <Text style={styles.section}>Tempat yang sering dicatat</Text>
    {places.length === 0 ? <View style={styles.empty}><Ionicons name="stats-chart-outline" size={32} color={colors.textLight}/><Text style={styles.emptyText}>Statistik akan muncul setelah kamu menyimpan jejak.</Text></View> : places.slice(0,8).map(([place,count],index)=><View key={place} style={styles.row}><View style={{flex:1}}><Text style={styles.place}>{index+1}. {place}</Text><View style={styles.barTrack}><View style={[styles.bar,{width:`${(count/places[0][1])*100}%`}]}/></View></View><Text style={styles.count}>{count}x</Text></View>)}
    <Pressable style={styles.button} onPress={() => router.push('/timeline')}><Text style={styles.buttonText}>Lihat riwayat lokasi</Text></Pressable>
  </ScrollView><BottomNav/></SafeAreaView>;
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:colors.background},content:{padding:22,paddingBottom:120},eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.5,color:colors.primary},title:{fontSize:28,fontWeight:'900',color:colors.text,marginTop:7},subtitle:{fontSize:13,lineHeight:19,color:colors.textSecondary,marginTop:7,marginBottom:20},summary:{flexDirection:'row',backgroundColor:colors.primary,borderRadius:20,padding:16,justifyContent:'space-between'},metric:{flex:1},number:{fontSize:27,fontWeight:'900',color:'#fff'},metricLabel:{fontSize:10,color:'#DDE8DA',marginTop:3},section:{fontSize:17,fontWeight:'900',color:colors.text,marginTop:25,marginBottom:13},row:{flexDirection:'row',alignItems:'center',gap:15,backgroundColor:colors.surface,borderRadius:15,padding:13,marginBottom:9},place:{fontSize:12,fontWeight:'800',color:colors.text},barTrack:{height:6,backgroundColor:'#E8EAE3',borderRadius:5,marginTop:8,overflow:'hidden'},bar:{height:6,backgroundColor:colors.success,borderRadius:5},count:{fontSize:12,fontWeight:'900',color:colors.primary},empty:{backgroundColor:colors.surface,borderRadius:17,padding:22,alignItems:'center'},emptyText:{fontSize:12,color:colors.textSecondary,textAlign:'center',marginTop:10},button:{backgroundColor:colors.primary,padding:14,borderRadius:14,alignItems:'center',marginTop:18},buttonText:{fontSize:13,color:'#fff',fontWeight:'800'}});
