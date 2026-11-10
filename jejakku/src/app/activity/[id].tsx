import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { getLocationById } from '../../services/databaseService';
import type { SavedLocation } from '../../types/location';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [location, setLocation] = useState<SavedLocation | null>(null);
  useEffect(() => { if (id) getLocationById(Number(id)).then(setLocation).catch(() => setLocation(null)); }, [id]);
  if (!location) return <SafeAreaView style={styles.screen}><View style={styles.center}><Text style={styles.title}>Jejak tidak ditemukan</Text><Pressable onPress={() => router.back()}><Text style={styles.link}>Kembali</Text></Pressable></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.content}>
    <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.text}/></Pressable>
    <View style={styles.hero}><View style={styles.pin}><Ionicons name="location" size={32} color={colors.primary}/></View><Text style={styles.title}>{location.placeName}</Text><Text style={styles.area}>{location.area}</Text></View>
    <View style={styles.card}><Text style={styles.label}>ALAMAT</Text><Text style={styles.value}>{location.displayName}</Text><Text style={styles.label}>KOORDINAT</Text><Text style={styles.value}>{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</Text><Text style={styles.label}>WAKTU DICATAT</Text><Text style={styles.value}>{new Date(location.visitedAt).toLocaleString('id-ID')}</Text><Text style={styles.label}>SUMBER</Text><Text style={styles.value}>{location.source === 'manual' ? 'Pencatatan manual' : 'Pelacakan otomatis'}</Text><Text style={styles.label}>CATATAN</Text><Text style={styles.value}>{location.note || 'Tidak ada catatan pribadi.'}</Text></View>
    <Pressable style={styles.button} onPress={() => Linking.openURL(`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=18/${location.latitude}/${location.longitude}`)}><Ionicons name="map-outline" size={18} color="#fff"/><Text style={styles.buttonText}>Buka di OpenStreetMap</Text></Pressable>
    <Text style={styles.attribution}>© OpenStreetMap contributors</Text>
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:colors.background},content:{padding:22,paddingBottom:40},back:{width:42,height:42,borderRadius:14,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center',marginBottom:22},hero:{alignItems:'center',marginBottom:22},pin:{width:72,height:72,borderRadius:24,backgroundColor:'#E7EDE2',alignItems:'center',justifyContent:'center'},title:{fontSize:25,fontWeight:'900',color:colors.text,marginTop:14,textAlign:'center'},area:{fontSize:13,fontWeight:'700',color:colors.primary,marginTop:5},card:{backgroundColor:colors.surface,borderRadius:20,padding:18,borderWidth:1,borderColor:colors.border},label:{fontSize:10,fontWeight:'900',letterSpacing:1,color:colors.textLight,marginTop:16},value:{fontSize:13,lineHeight:20,color:colors.text,marginTop:6},button:{backgroundColor:colors.primary,borderRadius:15,padding:15,marginTop:17,flexDirection:'row',gap:9,alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontWeight:'800'},attribution:{fontSize:10,color:colors.textLight,textAlign:'center',marginTop:15},center:{flex:1,alignItems:'center',justifyContent:'center'},link:{color:colors.primary,fontWeight:'800',marginTop:15}});
