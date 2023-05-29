import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FONTS from '../constants/fonts';
import scale from '../constants/responsive';

const BackHeader = (props) => {

    //img is left button image
    //onLeftButtonPress is event when left button is click
    //title is the title of BackHeader

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={props.onLeftButtonPress}>
                <Image style={styles.img} source={props.img}/>
            </TouchableOpacity>
            <View style={styles.titleTextContainer}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: scale(60),
    },
    back: {
        width: scale(32),
        height: scale(32),
        alignSelf: 'center',
        paddingLeft: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: scale(32),
        height: scale(32),
        resizeMode: 'stretch'
    },
    text: {
        lineHeight: scale(29),
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(24),
        color: 'white'
    },
    titleTextContainer: {
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

//make this component available to the app
export default BackHeader;
