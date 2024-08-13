// Pre-defined
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

// Component Library
import { Button, Card } from '@rneui/themed';

export default function Bird({ birdData }) {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Title style={styles.h2}>{birdData.name}</Card.Title>
        <Card.Divider/>
        <Image
          style={styles.image}
          source={{
            uri: birdData.imageURI
          }}
        />

        <Text style={styles.dataRow}><Text style={styles.bold}>Color:</Text> {birdData.color}</Text>
        <Text style={styles.dataRow}><Text style={styles.bold}>Category:</Text> {birdData.category}</Text>
        <Text style={styles.dataRow}><Text style={styles.bold}>Behavior:</Text> {birdData.behavior}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
  },
  h1: {
    fontSize: 50,
    marginTop: 0.67,
    marginBottom: 0.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 35,
    marginTop: 0.67,
    marginBottom: 0.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  dataRow: {
    fontSize: 18,
    marginBottom: 10,
  },
});