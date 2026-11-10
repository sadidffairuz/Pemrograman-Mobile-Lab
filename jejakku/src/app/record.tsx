import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Pressable, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { getCurrentCoordinates } from '../services/gpsService';
import { reverseGeocode } from '../services/nominatimService';
import { saveLocation } from '../services/databaseService';
import type { PlaceInfo } from '../types/location';

export default function RecordScreen() {
  const router = useRouter();
  const [place, setPlace] = useState<PlaceInfo | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const locate = async () => {
    setLoading(true); setError(''); setPlace(null);
    try {
      const coordinates = await getCurrentCoordinates();
      const result = await reverseGeocode(coordinates.latitude, coordinates.longitude);
      setPlace({ ...result, accuracy: coordinates.accuracy });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mendapatkan lokasi.');
    } finally { setLoading(false); }
  };

  const save = async () => {
    if (!place) return;
    setSaving(true);
    try {
      await saveLocation(place, note, 'manual', null);
      Alert.alert('Jejak tersimpan', 'Lokasi berhasil ditambahkan ke riwayat Jejakku.', [{ text: 'OK', onPress: () => router.replace('/timeline') }]);
    } catch (e) {
      Alert.alert('Gagal menyimpan', e instanceof Error ? e.message : 'Terjadi kesalahan database.');
    } finally { setSaving(false); }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.text}/></Pressable>
        <Text style={styles.eyebrow}>CATATAN PERJALANAN</Text>
        <Text style={styles.title}>Simpan tempat baru</Text>
        <Text style={styles.subtitle}>Ambil koordinat GPS perangkat, lalu cari alamatnya melalui OpenStreetMap.</Text>

        <View style={styles.card}>
          <View style={styles.icon}><Ionicons name="locate" size={28} color={colors.primary}/></View>
          <Text style={styles.cardTitle}>Lokasi saat ini</Text>
          <Text style={styles.muted}>Jejakku membutuhkan izin lokasi saat digunakan.</Text>
          <Pressable style={styles.primaryButton} onPress={locate} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff"/> : <Ionicons name="navigate" size={18} color="#fff"/>}
            <Text style={styles.primaryText}>{loading ? 'Mencari lokasi...' : 'Ambil Lokasi GPS'}</Text>
          </Pressable>
          {!!error && <Text style={styles.error}>{error}</Text>}
          {place && <View style={styles.result}>
            <Text style={styles.placeName}>{place.placeName}</Text>
            <Text style={styles.address}>{place.displayName}</Text>
            <Text style={styles.coordinates}>{place.latitude.toFixed(6)}, {place.longitude.toFixed(6)}</Text>
            {place.accuracy != null && <Text style={styles.muted}>Akurasi GPS sekitar {Math.round(place.accuracy)} meter</Text>}
          </View>}
        </View>

        <Text style={styles.label}>Catatan pribadi (opsional)</Text>
        <TextInput value={note} onChangeText={setNote} multiline placeholder="Apa yang kamu lakukan di tempat ini?" placeholderTextColor={colors.textLight} style={styles.input}/>
        <Pressable style={[styles.saveButton, (!place || saving) && styles.disabled]} onPress={save} disabled={!place || saving}>
          {saving ? <ActivityIndicator color="#fff"/> : <Ionicons name="bookmark" size={18} color="#fff"/>}
          <Text style={styles.primaryText}>{saving ? 'Menyimpan...' : 'Simpan Jejak'}</Text>
        </Pressable>
        <Text style={styles.attribution}>Pencarian alamat menggunakan © OpenStreetMap contributors (Nominatim).</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:colors.background}, content:{padding:22,paddingBottom:40}, back:{width:42,height:42,borderRadius:14,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center',marginBottom:22},
  eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.5,color:colors.primary}, title:{fontSize:28,fontWeight:'900',color:colors.text,marginTop:7}, subtitle:{fontSize:13,lineHeight:20,color:colors.textSecondary,marginTop:7,marginBottom:22},
  card:{backgroundColor:colors.surface,borderRadius:22,borderWidth:1,borderColor:colors.border,padding:18}, icon:{width:52,height:52,borderRadius:17,backgroundColor:'#E7EDE2',alignItems:'center',justifyContent:'center',marginBottom:13}, cardTitle:{fontSize:17,fontWeight:'800',color:colors.text}, muted:{fontSize:12,lineHeight:18,color:colors.textSecondary,marginTop:5}, primaryButton:{backgroundColor:colors.primary,borderRadius:15,padding:14,marginTop:17,flexDirection:'row',gap:9,justifyContent:'center',alignItems:'center'}, primaryText:{color:'#fff',fontWeight:'800',fontSize:14}, error:{color:colors.danger,fontSize:12,marginTop:12}, result:{marginTop:18,paddingTop:16,borderTopWidth:1,borderTopColor:colors.border}, placeName:{fontSize:17,fontWeight:'800',color:colors.text}, address:{fontSize:12,lineHeight:19,color:colors.textSecondary,marginTop:6}, coordinates:{fontSize:11,color:colors.primary,fontWeight:'700',marginTop:10}, label:{fontSize:13,fontWeight:'800',color:colors.text,marginTop:22,marginBottom:9}, input:{minHeight:105,textAlignVertical:'top',backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:16,padding:14,color:colors.text}, saveButton:{backgroundColor:colors.accent,borderRadius:15,padding:15,marginTop:17,flexDirection:'row',gap:9,justifyContent:'center',alignItems:'center'}, disabled:{opacity:0.45}, attribution:{fontSize:10,color:colors.textLight,textAlign:'center',marginTop:18,lineHeight:16}
});
