//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import scale from '../constants/responsive';
import FONTS from '../constants/fonts';

export const GenreGroup = (props) => {

    return (
        <View style={styles.container}>
            <View style={{flex: 2}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[0]}, styles.button]}>
                            <Text style={styles.text}>{props.genre[0] !== undefined ? props.genre[0] : ''}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[1]}, styles.button]}>
                            <Text style={styles.text}>{props.genre[1] !== undefined ? props.genre[1] : ''}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[2]}, styles.button]}>
                        <Text style={styles.text}>{props.genre[2] !== undefined ? props.genre[2] : ''}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[3]}, styles.button]}>
                    <Text style={styles.text}>{props.genre[3] !== undefined ? props.genre[3] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[4]}, styles.button]}>
                    <Text style={styles.text}>{props.genre[4] !== undefined ? props.genre[4] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{flex: 2, backgroundColor: props.colors[5]}, styles.button]}>
                    <Text style={styles.text}>{props.genre[5] !== undefined ? props.genre[5] : ''}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        width: scale(372),
        height: scale(372),
    },
    button: {
        borderRadius: scale(20), 
        margin: scale(6),
    },
    text: {
        width: scale(100),
        overflow: 'hidden',
        margin: scale(5),
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(22),
        lineHeight: scale(26),
        color: 'white'
    }
});
