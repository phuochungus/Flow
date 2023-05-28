//import liraries
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import FONTS from './src/constants/fonts';
import BackHeader from './src/components/back-header';
import { IMG_BackDown } from './src/assets/images';
import Playing from './src/screen/Playing/Playing';

const App = () => {

  return (
    <View style={styles.container}>
      <Playing/>
    </View>
  )
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
