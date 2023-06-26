//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import scale from '../constants/responsive';
import FONTS from '../constants/fonts';

export const GenreGroup = (props) => {

    const handleOnPressed = (index)=> {
        getListSong(props.apiName[index]);
    }

    const getListSong = (name)=> {
        if (name == 'R&B') 
            name = 'R%26B';
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch("https://flow-fbmj.onrender.com/tracks/explore?playlistName=" + name, requestOptions)
            .then(response => response.json())
            .then(result => {listSong = result; props.navigation.navigate('SearchResult', {listSong: listSong, type: 'all'})})
            .catch(error => console.log('error', error, " ", name));
    }

    var listSong = [];

    useEffect(()=>{
        //getListSong('Pop');
    }, [])

    return (
        <View style={styles.container}>
            <View style={{flex: 2}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[0]}, styles.button]} onPress={() => handleOnPressed(0)}>
                            <Text style={styles.text}>{props.genre[0] !== undefined ? props.genre[0] : ''}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[1]}, styles.button]} onPress={()=>handleOnPressed(1)}>
                            <Text style={styles.text}>{props.genre[1] !== undefined ? props.genre[1] : ''}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[2]}, styles.button]} onPress={()=>handleOnPressed(2)}>
                        <Text style={styles.text}>{props.genre[2] !== undefined ? props.genre[2] : ''}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[3]}, styles.button]}  onPress={()=>handleOnPressed(3)}>
                    <Text style={styles.text}>{props.genre[3] !== undefined ? props.genre[3] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={[{flex: 1, backgroundColor: props.colors[4]}, styles.button]}  onPress={()=>handleOnPressed(4)}>
                    <Text style={styles.text}>{props.genre[4] !== undefined ? props.genre[4] : ''}</Text>
                </TouchableOpacity>
                {props.genre[5] !== undefined ? (
                    <TouchableOpacity style={[{flex: 2, backgroundColor: props.colors[5]}, styles.button]}  onPress={()=>handleOnPressed(5)}>
                        <Text style={styles.text}>{props.genre[5]}</Text>
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
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
