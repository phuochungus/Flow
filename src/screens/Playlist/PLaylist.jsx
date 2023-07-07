//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {PlaylistElement} from '../../components/index';
import { PlayingContext } from '../../constants/playingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scale from '../../constants/responsive';

// create a component
export const Playlist = ({navigation}) => {

    const {player2} = useContext(PlayingContext);
    const [playlist, setPlayList] = useState([]);
    const [listId, setListId] = useState([]);
    var lst = [];

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
            temp = playlist;
            lst.push(result);
            console.log(lst);
          })
          .catch(error => console.log('error', error));
        return null;
    };

    const getListId = async ()=>{
        let temp = await AsyncStorage.getItem('list-sound');
        let list = JSON.parse(temp);
        setListId(list);
    }

    // useEffect(()=>{
    //     if (playlist.length === 0) {
    //         getPlayList();
    //     }
    // }, [playlist])

    useEffect(()=>{
        getListId();
    }, [player2.listSounds])

    useEffect(()=>{
        getListId();
    }, [])

    useEffect(()=>{

    }, [player2.songInfo])

    return (
        <View style={styles.container}>
            <FlatList 
            data={listId}
            renderItem={({item, index}) => 
                        <PlaylistElement
                        id={item.id} 
                        index={index}
                        navigation={navigation}
                        list={listId}/>}
            keyExtractor={(item, index) => index}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
});
