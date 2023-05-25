//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import scale from '../constants/responsive';
import FONTS from '../constants/fonts';

// create a component
const BackHeader = (props) => {

    const {
        onLeftButtonPressed,
        title,
    } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back}>
                <Text style={{color: 'black', fontFamily: FONTS.NotoSans.Black}}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        width: '100%',
        height: scale.scaleHeight(60),
    },
    back: {
        width: 50,
        height: '100%',
        backgroundColor: 'red',
        //borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default BackHeader;
