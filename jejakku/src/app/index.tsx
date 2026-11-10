import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { colors } from '../constants/colors';
import { listLocations } from '../services/databaseService';
import type { SavedLocation } from '../types/location';

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
};

export default function HomeScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  useFocusEffect(useCallback(() => { listLocations().then(setLocations).catch(() => setLocations([])); }, []));
  const uniquePlaces = new Set(locations.map((item) => item.placeName)).size;

  return <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.top}><View style={styles.brandIcon}><Ionicons name="map" size={22} color="#fff"/></View><Text style={styles.brand}>jejakku<Text style={{color:colors.accent}}>.</Text></Text><Pressable style={styles.avatar} onPress={() => router.push('/profile')}><Ionicons name="person-outline" size={20} color={colors.primary}/></Pressable></View>
      <Text style={styles.eyebrow}>RUANG KECIL UNTUK CERITAMU</Text>
      <Text style={styles.heading}>{greeting()} 👋</Text>
      <Text style={styles.subheading}>Setiap tempat punya cerita. Yuk, simpan jejakmu.</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>RINGKASAN JEJAK</Text>
        <View style={styles.metrics}><View><Text style={styles.number}>{uniquePlaces}</Text><Text style={styles.metricLabel}>tempat tersimpan</Text></View><View style={styles.separator}/><View><Text style={styles.number}>{locations.length}</Text><Text style={styles.metricLabel}>catatan lokasi</Text></View></View>
        <Text style={styles.summaryFoot}>Riwayat disimpan secara lokal di perangkat.</Text>
      </View>

      <Text style={styles.sectionTitle}>Mulai mencatat perjalanan</Text>
      <Text style={styles.sectionSubtitle}>Pilih cara yang paling sesuai dengan aktivitasmu.</Text>
      <Pressable style={styles.actionCard} onPress={() => router.push('/record')}><View style={styles.actionIcon}><Ionicons name="location" size={24} color={colors.primary}/></View><View style={{flex:1}}><Text style={styles.actionTitle}>Catat lokasi sekarang</Text><Text style={styles.actionDescription}>Ambil GPS, cari alamat, dan tambahkan cerita.</Text></View><Ionicons name="chevron-forward" size={20} color={colors.textLight}/></Pressable>
      <Pressable style={styles.actionCard} onPress={() => router.push('/tracking')}><View style={[styles.actionIcon,{backgroundColor:'#F8E9DD'}]}><Ionicons name="navigate" size={24} color={colors.accent}/></View><View style={{flex:1}}><Text style={styles.actionTitle}>Mulai perjalanan otomatis</Text><Text style={styles.actionDescription}>Rekam titik perjalanan selama sesi aktif.</Text></View><Ionicons name="chevron-forward" size={20} color={colors.textLight}/></Pressable>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Jejak terbaru</Text><Pressable onPress={() => router.push('/timeline')}><Text style={styles.link}>Lihat semua</Text></Pressable></View>
      {locations.slice(0,3).map((item) => <View key={item.id} style={styles.recent}><View style={styles.recentIcon}><Ionicons name="pin" size={19} color={colors.primary}/></View><View style={{flex:1}}><Text style={styles.recentTitle}>{item.placeName}</Text><Text style={styles.recentMeta}>{item.area} · {item.source === 'manual' ? 'Manual' : 'Otomatis'}</Text></View></View>)}
      {locations.length === 0 && <View style={styles.empty}><Ionicons name="footsteps-outline" size={30} color={colors.textLight}/><Text style={styles.emptyText}>Belum ada jejak. Mulai dengan mencatat lokasi pertamamu.</Text></View>}
      <Text style={styles.attribution}>Reverse geocoding oleh © OpenStreetMap contributors.</Text>
    </ScrollView>
    <BottomNav/>
  </SafeAreaView>;
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:colors.background},content:{paddingHorizontal:22,paddingTop:12,paddingBottom:120},top:{flexDirection:'row',alignItems:'center',gap:9,marginBottom:28},brandIcon:{width:38,height:38,borderRadius:13,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},brand:{fontSize:23,fontWeight:'900',color:colors.text,flex:1},avatar:{width:40,height:40,borderRadius:14,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,alignItems:'center',justifyContent:'center'},eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.5,color:colors.primary},heading:{fontSize:29,fontWeight:'900',color:colors.text,marginTop:7},subheading:{fontSize:13,color:colors.textSecondary,marginTop:6,marginBottom:21},summary:{backgroundColor:colors.primary,borderRadius:23,padding:20,marginBottom:25},summaryLabel:{fontSize:10,fontWeight:'800',letterSpacing:1.2,color:'#DDE8DA'},metrics:{flexDirection:'row',alignItems:'center',marginTop:18,marginBottom:15},number:{fontSize:34,fontWeight:'900',color:'#fff'},metricLabel:{fontSize:11,color:'#DDE8DA',marginTop:2},separator:{width:1,height:42,backgroundColor:'rgba(255,255,255,0.25)',marginHorizontal:25},summaryFoot:{fontSize:10,color:'#E8EEE5'},sectionTitle:{fontSize:18,fontWeight:'900',color:colors.text},sectionSubtitle:{fontSize:11,color:colors.textSecondary,marginTop:4,marginBottom:12},actionCard:{backgroundColor:colors.surface,borderRadius:18,padding:14,borderWidth:1,borderColor:colors.border,flexDirection:'row',alignItems:'center',gap:12,marginBottom:10},actionIcon:{width:46,height:46,borderRadius:15,backgroundColor:'#E7EDE2',alignItems:'center',justifyContent:'center'},actionTitle:{fontSize:13,fontWeight:'800',color:colors.text},actionDescription:{fontSize:10,lineHeight:15,color:colors.textSecondary,marginTop:4},sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:19,marginBottom:12},link:{fontSize:11,fontWeight:'800',color:colors.primary},recent:{flexDirection:'row',alignItems:'center',gap:11,backgroundColor:colors.surface,borderRadius:15,padding:12,marginBottom:8,borderWidth:1,borderColor:colors.border},recentIcon:{width:38,height:38,borderRadius:13,backgroundColor:'#E7EDE2',alignItems:'center',justifyContent:'center'},recentTitle:{fontSize:12,fontWeight:'800',color:colors.text},recentMeta:{fontSize:10,color:colors.textSecondary,marginTop:4},empty:{alignItems:'center',backgroundColor:colors.surface,borderRadius:17,padding:20},emptyText:{fontSize:11,color:colors.textSecondary,textAlign:'center',marginTop:9,lineHeight:17},attribution:{fontSize:9,color:colors.textLight,textAlign:'center',marginTop:22}});
