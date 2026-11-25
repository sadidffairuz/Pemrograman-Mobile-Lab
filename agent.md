import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from '../services/auth/supabaseClient';
import { dialogService } from '../services/dialogService';

export default function NotesScreen() {
  const [text, setText] = useState('');

  const Simpan = async () => {
    const { error } = await supabase.from('notes').insert([{ text }]);

    if (error) {
      dialogService.alert('Gagal', error.message);
    } else {
      dialogService.alert('Berhasil', 'Data berhasil disimpan!');
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="input"
        value={text}
        onChangeText={setText}
      />
      <Button title="simpan" onPress={Simpan} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
