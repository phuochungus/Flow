//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import scale from '../../constants/responsive';
import { useState } from 'react';
import { IMG_Remove, IMG_Search } from '../../assets/images';
import FONTS from '../../constants/fonts';
import { SearchElement } from '../../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniPlaying from '../../components/miniPlaying';

// create a component
export const SearchFocused = ({navigation, route}) => {

    const [history, setHistory] = useState([]);

    const getHistory = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');

        if (accessToken == null)
            return;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://flow-fbmj.onrender.com/me/search_history", requestOptions)
        .then(response => response.json())
        .then(result => {setHistory(result)})
        .catch(error => console.log('error', error));
    }

    const removeHistory = async (id) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://flow-fbmj.onrender.com/me/search_history", requestOptions)
            .then(response => response.text())
            .then(result => {getHistory()})
            .catch(error => console.log('error', error));
    }

    const removeAllHistory = ()=> {
        removeHistory('all');
    }

    useEffect(()=>{
        getHistory();
    }, [history])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <Image style={styles.searchIcon} source={IMG_Search}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('SearchResult', {type: 'enterText'})}>
                        <TextInput onChangeText={text => onChangeText(text)}
                                    value={''}
                                    editable={false}
                                    placeholder={'Bài hát, nghệ sĩ hoặc album'}
                                    placeholderTextColor={'#8A9A9D'}
                                    style={styles.searchInput}></TextInput>
                    </TouchableOpacity> 
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("SearchDefault")}>
                    <Text style={styles.cancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {(history.length > 0) ? (
                <>
                    <Text style={styles.titleText}>Các tìm kiếm gần đây</Text>
                    <FlatList 
                        data={history}
                        renderItem={({item}) => <SearchElement 
                                                    id={item.id}
                                                    img={item.images !== undefined ? item.images[0].url : 'https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg'} 
                                                    song={item.name} 
                                                    type={item.type} 
                                                    artists={item.artists}
                                                    result={false}
                                                    navigation={navigation}
                                                    onPress={()=>removeHistory(item.id)}/>}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={()=>removeAllHistory()}>
                        <Text style={styles.deleteText}>Xóa các tìm kiếm gần đây</Text>
                    </TouchableOpacity>
                </>

            ) : (
                (false) ? (
                    <FlatList 
                        data={searchResult.mostRelevant}
                        renderItem={({item}) => <SearchElement 
                                                    id={item.id}
                                                    img={item.images?[0].url : 'https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg'} 
                                                    song={item.name} 
                                                    type={item.type} 
                                                    artists={item.artists}
                                                    result={true}
                                                    navigation={navigation}
                                                    onPress={()=>{ removeHistory(item.id) }}/>}
                        keyExtractor={item => item.id}
                />
                ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.text1}>Phát những gì bạn thích</Text>
                        <Text style={styles.text2}>Tìm kiếm nghệ sĩ, bài hát, album, ...</Text>
                    </View>
                )
            )}
            <View style={{height: scale(72)}}/>
            <MiniPlaying navigation={navigation}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: scale(44),
        marginLeft: scale(20),
        marginTop: 3,
    },
    search: {
        flexDirection: 'row',
        width: scale(338),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: scale(22),
        borderColor: 'grey',
        borderWidth: 1,
    },
    searchIcon: {
        width: scale(24),
        height: scale(24),
    },
    searchInput: {
        width: scale(338) - scale(24) - scale(30),
        height: '100%',
        color: '#DADADA',
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(15),
    },
    cancel: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(16),
        lineHeight: scale(22),
        color: '#DADADA',
    },
    removeIcon: {
        width: scale(20),
        height: scale(20),
    },
    titleText: {
        width: scale(338),
        marginLeft: scale(20),
        marginTop: scale(20),
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white'
    },
    deleteButton: {
        width: scale(200),
        height: scale(32),
        marginBottom: 20,
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: scale(16),
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(13),
        lineHeight: scale(18),
        color: 'white'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    text1: {
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white',
    },
    text2: {
        fontFamily: FONTS.NotoSans.Regular,
        fontSize: scale(13),
        lineHeight: scale(18),
        color: '#B1B5BB',
    },
});

