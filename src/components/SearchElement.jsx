//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import scale from '../constants/responsive';
import { IMG_HorizontalDots, IMG_Remove } from '../assets/images';
import FONTS from '../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SearchElement = (props) => {


    const handleSongName = (text) => {
        if (text == undefined)
            return "Loading..."; 
        let result = [];
        if (text.length > 37) {
            let i = 0;
            while (i < 34) {
                result[i] = text[i];
                i = i + 1;
            }
            result[34] = ".";
            result[35] = ".";
            result[36] = ".";
        }
        else {
            return text;
        }
        return result;
    }

    const handleArtistsName = (artists) => {
        if (artists == undefined) 
            return undefined;
        let names = [];
        for (let i = 0; i < artists.length; i++) {
            if (i != 0)
                names.push(" " + artists[i].name);
            else
                names.push(artists[i].name);
        }
        let text = names.toString();
        let result = "";
        if (text.length > 33) {
            let i = 0;
            result = text.slice(0, 30);
            result += "...";
        }
        else {
            return text;
        }
        return result;
    }

    const handleType = (text) => {
        let artistText = "";
        if (text !== 'artist')
            artistText = handleArtistsName(props.artists);
        else {
            return "Nghệ sĩ";
        }
        if (text == 'track') {
            return "Bài hát - " + artistText;
        }
        else {
            return "Album - " + artistText;
        }
    }

    const addToHistory = async (id, type) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "id": id,
          "type": type,
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://flow-fbmj.onrender.com/me/search_history", requestOptions)
          .then(response => response.text())
          //.then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    const onItemPress = (id, result, type)=> {
        if (result) {
            addToHistory(id, type);
        }
        if (type == 'track')
            props.navigation.navigate("Playing", {id: id});
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={()=>onItemPress(props.id, props.result, props.type)}>
                <View style={styles.leftContainer}>
                    {/* <FastImage style={styles.image} source={{uri: props.img, cache: FastImage.cacheControl.cacheOnly}}/> */}
                    <Image style={styles.image} source={{uri: props.img}} />
                    <View style={{marginLeft: scale(12)}}>
                        <Text style={styles.song}>{handleSongName(props.song)}</Text>
                        <Text style={styles.otherText}>{handleType(props.type)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.result ? ()=>{} : props.onPress}>
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
