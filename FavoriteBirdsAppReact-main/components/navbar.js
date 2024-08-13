// Pre-defined
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

// Component Library
import { Button } from '@rneui/themed';

export default function NavBar() {
    const handleHome = () => {
        router.navigate('/');
    }
    const handleUpdate = () => {
        router.navigate('/update');
    }
    const handleNew = () => {
        router.navigate('/new_bird');
    }
    return (
        <View style={styles.container}>
            <Button title={"Bird View"} onPress={handleHome} buttonStyle={styles.button} titleStyle={styles.button_title} />
            <Button title={"Update Bird"} onPress={handleUpdate} buttonStyle={styles.button} titleStyle={styles.button_title} />
            <Button title={"New Bird"} onPress={handleNew} buttonStyle={styles.button} titleStyle={styles.button_title} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 5,
        marginTop: 20,
    },
    button: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 5,
        width: 100,
        marginHorizontal: 20,
    },
    button_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button_title: {
        fontWeight: 'bold',
        fontSize: 23,
    },
});