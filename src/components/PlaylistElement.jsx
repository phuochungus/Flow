//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import scale from '../constants/responsive';
import { IMG_Like, IMG_Liked } from '../assets/images';
import FONTS from '../constants/fonts';
import { PlayingContext } from '../constants/playingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
export const PlaylistElement = (props) => {

    const [item, setItem] = useState(null);
    const { player2 } = useContext(PlayingContext);
    const [id, setId] = useState(null);

    const handleSongName = (text) => {
        if (text == undefined)
            return "Loading..."; 
        let result = [];
        if (text.length > 27) {
            let i = 0;
            while (i < 24) {
                result[i] = text[i];
                i = i + 1;
            }
            result[24] = ".";
            result[25] = ".";
            result[26] = ".";
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
        if (text.length > 37) {
            let i = 0;
            result = text.slice(0, 34);
            result += "...";
        }
        else {
            return text;
        }
        return result;
    }

    const getSongInfo = async (id) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        await fetch(
          'https://flow-fbmj.onrender.com/tracks/track/' + id,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            setItem(result);
          })
          .catch(error => console.log('error', error));
        return null;
    };

    const handleFavorites = async (method) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": props.id,
        });

        var requestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://flow-fbmj.onrender.com/me/favourites", requestOptions)
        // .then(response => response.text())
        .then(result => { getSongInfo(props.id); })
        .catch(error => console.log('error', error));
    }

    const getIndex = async () => {
        let temp = await AsyncStorage.getItem('index-playing'); 
        setId(parseInt(temp));
    }

    useEffect(()=>{
        getSongInfo(props.id);
    }, [player2.songInfo, player2.listSound])

    useEffect(()=>{
        getIndex();
    }, [player2.index, player2.songInfo])

    return (
        <View style={[styles.container, id !== null ? (id === props.index ? {backgroundColor: '#0085FF'} : {backgroundColor: '#121212'}) : {}]}>
            <TouchableOpacity onPress={()=>{player2.setIndex(props.index); props.navigation.navigate('Playing', {type: 'list', list: props.list})}}>
                <View style={styles.leftContainer}>
                    <Image style={styles.image} source={{uri: item?.images[0] ? item.images[0]?.url : 'https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg'}} />
                    <View style={{marginLeft: scale(12)}}>
                        <Text style={styles.song}>{handleSongName(item?.name)}</Text>
                        <Text style={styles.otherText}>{handleArtistsName(item?.artists)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={!item?.isFavourite ? 
                                                        ()=>{handleFavorites('POST'); ToastAndroid.show('Đã thêm vào yêu thích', ToastAndroid.SHORT);} : 
                                                        ()=>{handleFavorites('DELETE'); ToastAndroid.show('Đã xóa khỏi yêu thích', ToastAndroid.SHORT);}}>
                <Image style={{alignSelf: 'center'}} source={item?.isFavourite ? IMG_Liked : IMG_Like}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: scale(398),
        height: scale(72),
        marginTop: scale(12),
        alignSelf: 'center',
    },
    image: {
        width: scale(72),
        height: scale(72),
    },
    icon: {
        width: scale(20),
        height: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: scale(12),
    },
    leftContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    },
});
