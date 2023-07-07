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
    const [listId, setListId] = useState([]);

    const getListId = async ()=>{
        let temp = await AsyncStorage.getItem('list-sound');
        let list = JSON.parse(temp);
        setListId(list);
    }

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
