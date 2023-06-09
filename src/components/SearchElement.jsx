//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import scale from '../constants/responsive';
import { IMG_HorizontalDots, IMG_Remove } from '../assets/images';
import FONTS from '../constants/fonts';

export const SearchElement = (props) => {

    return (
        <View style={styles.container} >
            <TouchableOpacity>
                <View style={styles.leftContainer}>
                    <Image style={styles.image} source={props.img}/>
                    <View style={{marginLeft: scale(12)}}>
                        <Text style={styles.song}>{props.song}</Text>
                        <Text style={styles.otherText}>{props.other}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icon} source={props.result ? IMG_HorizontalDots : IMG_Remove}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: scale(389),
        height: scale(48),
        marginTop: scale(12),
        marginLeft: scale(20),
    },
    icon: {
        alignSelf: 'center',
    },
    image: {
        width: scale(48),
        height: scale(48),
        resizeMode: 'cover',
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '100%',
    },
    song: {
        fontFamily: FONTS.NotoSans.Bold,
        fontSize: scale(15),
        lineHeight: scale(18),
        color: 'white',
    },
    otherText: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(13),
        lineHeight: scale(18),
        color: '#DADADA'
    }
});
