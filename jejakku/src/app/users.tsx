import {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';


interface User {
    id: number;
    nama: string;
    email: string;
}


const api = 'https://jsonplaceholder.typicode.com/users';

export default function tampilkanData() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    return (
        <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: '#fff'}}>
            <ScrollView>
                {users.map((user) => (
                    <View key={user.id} style={styles.namaStyle}>
                        <Text style={styles.namaStyle}>{user.nama}</Text>
                        <Text style={styles.emailStyle}>{user.email}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    namaStyle: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    emailStyle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
});
