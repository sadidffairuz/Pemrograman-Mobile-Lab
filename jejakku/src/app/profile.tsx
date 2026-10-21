import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

// test
export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Link href="/" style={styles.link}>Back to Home</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F8FC",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    link: {
        color: "#5B6CFF",
        fontSize: 16,
        fontWeight: "600",
    },
});