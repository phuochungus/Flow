//import liraries
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import FONTS from '../constants/fonts';
import scale from '../constants/responsive';

// create a component
export const GroupResult = props => {
  const {type, onPress, color} = props;

  return (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
        style={[styles.container, {backgroundColor: color}]}
        activeOpacity={0.8}
        onPress={onPress}>
        <Text style={styles.text}>{type}</Text>
        </TouchableOpacity>
        <View style={{width: scale(12)}}></View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: scale(17),
    width: 'auto',
    height: scale(30),
  },
  text: {
    marginHorizontal: scale(10),
    fontFamily: FONTS.NotoSans.Medium,
    fontSize: scale(15),
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

