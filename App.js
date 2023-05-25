//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackHeader from './src/components/backHeader';
import scale from './src/constants/responsive';
import FONTS from './src/constants/fonts';

// create a component
const App = () => {

  return (
    <View style={styles.container}>
      <Text style={{width: 'auto', height: 50, fontSize: 16, color: 'black', fontFamily: FONTS.NotoSans.Bold}}>Flow App Demo</Text>
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
