// Pre-defined
import { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Linking } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

// Components
import { BirdContext } from '../components/BirdContext.js';

// Component Library
import { Button, Card, Input, Icon } from '@rneui/themed';

export default function Page() {
  const db = useSQLiteContext();

  // Track currently selected bird
  const { birdIndex, setBirdIndex } = useContext(BirdContext);

  // Hold result of database call to bird at current bird index
  const [DBResult, setDBResult] = useState(db[birdIndex]);

  // Hold result of database call to updated bird at current index
  const [newDBResult, setNewDBResult] = useState(db[birdIndex]);

  // Track text input content for use in updating the database
  const [birdName, setBirdName] = useState("");
  const [birdColor, setBirdColor] = useState("");
  const [birdCategory, setBirdCategory] = useState("");
  const [birdBehavior, setBirdBehavior] = useState("");
  const [birdImageUri, setBirdImageUri] = useState("");

  // Get row associated with bird at current index
  useEffect(() => {
    async function setup() {
      const sqlQuery = `SELECT * FROM birds WHERE id=${birdIndex + 1}`
      const result = await db.getFirstAsync(sqlQuery);
      setDBResult(result);

      setBirdName(result.name);
      setBirdColor(result.color);
      setBirdCategory(result.category);
      setBirdBehavior(result.behavior);
      setBirdImageUri(result.imageURI);
    }
    setup();
  }, [newDBResult]);

  // Update data of currently selected bird
  const updateRow = () => {
    async function update() {
      const sqlQuery = `
                UPDATE birds
                SET name="${birdName}",
                color="${birdColor}",
                category="${birdCategory}",
                behavior="${birdBehavior}",
                imageURI="${birdImageUri}"
                WHERE id=${birdIndex + 1}
                `
      const result = await db.runAsync(sqlQuery);
      setNewDBResult(result);
    }
    update();
  };

  // Loading icon display while waiting for DB result
  if (DBResult == null) {
    return (
      <View style={styles.iconContainer}>
        <Icon
          name='loader'
          type='feather'
          raised
          size={100}
        />
      </View>
    )
  }

  return (
    <View >
      <Card>
        <Card.Title>
          <Text style={styles.h1}>Current Bird: {""}
            <Text style={styles.currentBirdName}>{DBResult["name"]}</Text>
          </Text>
        </Card.Title>
        <Card.Divider/>

        <Input label="Name:" onChangeText={setBirdName} value={birdName} leftIcon={{ type: 'material-community', name: 'bird' }} />
        <Input label="Color:" onChangeText={setBirdColor} value={birdColor} leftIcon={{ type: 'foundation', name: 'paint-bucket' }} />
        <Input label="Category:" onChangeText={setBirdCategory} value={birdCategory} leftIcon={{ type: 'material', name: 'category' }} />
        <Input label="Behavior:" onChangeText={setBirdBehavior} value={birdBehavior} leftIcon={{ type: 'material-community', name: 'run' }} />
        <Input label="Image URI:" onChangeText={setBirdImageUri} value={birdImageUri} leftIcon={{ type: 'antdesign', name: 'picture' }} />
      </Card>

      <View style={styles.container}>
        <Button title={"Update Info"} onPress={() => { updateRow() }} buttonStyle={styles.button} titleStyle={styles.button_title} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginTop: 200,
    alignItems: 'center',
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  currentBirdName: {
    fontSize: 28,
    fontWeight: 'normal',
    color: 'rgba(111, 202, 186, 1)',
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