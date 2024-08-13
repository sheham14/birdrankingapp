import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import {useState, useReducer} from 'react';

import Bird from './components/bird.js'
import RadioButton from './components/radioButton.js'

import Bluejay from './birdData/Bluejay.json';
import Flicker from './birdData/Flicker.json';
import Nuthatch from './birdData/Nuthatch.json';

export default function App() {

  const [birdData, setBirdData] = useState(Bluejay);

  const [buttonPressed, setButtonPressed] = useState("1");

  const [birdIndex, setBirdIndex] = useReducer((state, action) => {
    switch (action){
        case 1:
            setBirdData(Bluejay);
            break;
        case 2:
            setBirdData(Flicker);
            break;
        case 3:
            setBirdData(Nuthatch);
            break;
        default:
            setBirdData(Nuthatch);
    }
  },1);

  return (
    <View style={styles.container}>
      <Bird birdData={birdData}/>

      <View id="button_container" style={styles.button_container}>
        <RadioButton buttonText="1" buttonPushed={buttonPressed} onPress={() =>{
            setBirdIndex(1);
            setButtonPressed("1");
        }}></RadioButton>
        <RadioButton buttonText="2" buttonPushed={buttonPressed} onPress={() =>{
            setBirdIndex(2);
            setButtonPressed("2");
        }}></RadioButton>
        <RadioButton buttonText="3" buttonPushed={buttonPressed} onPress={() =>{
            setBirdIndex(3);
            setButtonPressed("3");
        }}></RadioButton>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
  }
});
