// Pre-defined
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// Component Library
import { Button, Card, Input } from '@rneui/themed';

export default function NavBar() {
    const db = useSQLiteContext();

    // Track user input details for database insert
    const [birdName, setBirdName] = useState("");
    const [birdColor, setBirdColor] = useState("");
    const [birdCategory, setBirdCategory] = useState("");
    const [birdBehavior, setBirdBehavior] = useState("");
    const [birdImageUri, setBirdImageUri] = useState("");

    // Insert new bird row into database using user input data
    const addRow = () => {
        async function add() {
            const result = await db.runAsync('INSERT INTO birds (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', birdName, birdColor, birdCategory, birdBehavior, birdImageUri);
        }
        add();
    };

    return (
        <View>
            <Card>
                <Card.Title style={styles.h1}>Add A New Bird</Card.Title>
                <Card.Divider />
                <Input label="Name:" onChangeText={setBirdName} leftIcon={{ type: 'material-community', name: 'bird' }} />
                <Input label="Color:" onChangeText={setBirdColor} leftIcon={{ type: 'foundation', name: 'paint-bucket' }} />
                <Input label="Category:" onChangeText={setBirdCategory} leftIcon={{ type: 'material', name: 'category' }} />
                <Input label="Behavior:" onChangeText={setBirdBehavior} leftIcon={{ type: 'material-community', name: 'run' }} />
                <Input label="Image URI:" onChangeText={setBirdImageUri} leftIcon={{ type: 'antdesign', name: 'picture' }} />
            </Card>

            <View style={styles.container}>
                <Button title={"Add Bird"} onPress={() => { addRow() }} buttonStyle={styles.button} titleStyle={styles.button_title} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 5,
        width: 300,
        marginHorizontal: 20,
        marginTop: 5,
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