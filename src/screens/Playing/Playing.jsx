//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import BackHeader from '../../components/back-header';
import { IMG_AddPlaylist, IMG_BackDown, IMG_Dots, IMG_Like, IMG_Liked, IMG_Next, IMG_Play, IMG_Previous, IMG_Random, IMG_Repeat, IMG_Up } from '../../assets/images';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
export const Playing = () => {
    
    const [songInfo, setSongInfo] = useState({});
    const [lyrics, setLyrics] = useState({});

    var accessToken = AsyncStorage.getItem('access_token');

    const getAPI = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // setSongInfo({name: "Giúp anh trả lời những câu hỏi", artists: [{name: "Tên ca sĩ"}, {name: "Ten ca si 2"}, {name: "Ten ca si thu ba dai lam"}], isFavourite: true});
        fetch("https://flow-backend.herokuapp.com/tracks/track/2nMeu6UenVvwUktBCpLMK9", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result); setSongInfo(result)})
            .catch(error => console.log('error', error));

        // getSong
        // requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };
          
        // fetch("https://flow-backend.herokuapp.com/tracks/play/2nMeu6UenVvwUktBCpLMK9", requestOptions)
        //     //.then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));

        //getLyrics
        requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("https://flow-backend.herokuapp.com/tracks/lyrics/2qxmye6gAegTMjLKEBoR3d", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result); setLyrics(result)})
            .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        getSongInfo();
        getLyrics();
        console.log(songInfo);
    }, [])

    const getSongInfo = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // setSongInfo({name: "Giúp anh trả lời những câu hỏi", artists: [{name: "Tên ca sĩ"}, {name: "Ten ca si 2"}, {name: "Ten ca si thu ba dai lam"}], isFavourite: true});
        fetch("https://flow-backend.herokuapp.com/tracks/track/2nMeu6UenVvwUktBCpLMK9", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result); setSongInfo(result)})
            .catch(error => console.log('error', error));
    }

    const getLyrics = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("https://flow-backend.herokuapp.com/tracks/lyrics/2qxmye6gAegTMjLKEBoR3d", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result); setLyrics(result)})
            .catch(error => console.log('error', error));
    }

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
        let names = [];
        for (let i = 0; i < artists.length; i++) {
            if (i != 0)
                names.push(" " + artists[i].name);
            else
                names.push(artists[i].name);
        }
        let text = names.toString();
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

    const handleFavorites = (method) => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": "2nMeu6UenVvwUktBCpLMK9"
        });

        var requestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://flow-backend.herokuapp.com/me/favourites", requestOptions)
        // .then(response => response.text())
        .then(result => {console.log("liked"); getSongInfo();})
        .catch(error => console.log('error', error));
    }

    return (
        <ScrollView style={styles.container}>
            <BackHeader onLeftButtonPressed={()=>Alert.alert("left button pressed")} img={IMG_BackDown}/>
            <View style={styles.DVDContainer}>
                <ImageBackground style={[styles.imgBackground, {transform: [{rotate: '45deg'}],}]} source={{uri: songInfo.images !== undefined ? songInfo.images[0].url : "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg"}}>
                    <View style = {styles.smallCircle}/>
                </ImageBackground>
            </View>
            <View style={styles.nameArtistIconContainer}>
                <View>
                    <Text style={styles.songText}>{handleSongName(songInfo.name)}</Text>
                    <Text style={styles.artistText}>{songInfo.artists !== undefined ? handleArtistsName(songInfo.artists) : "Loading..."}</Text>
                </View>
                <View style={styles.iconBox}>
                    <TouchableOpacity onPress={!songInfo.isFavourite ? ()=>{handleFavorites('POST')} : ()=>{handleFavorites('DELETE')}}>
                        <Image style={styles.icon} source={songInfo.isFavourite ? IMG_Liked : IMG_Like}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={IMG_AddPlaylist}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.iconDots} source={IMG_Dots}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.progressTimeContainer}>
                <Progress.Bar progress={0.4} width={scale(398)} color='#E70DFB' unfilledColor='black' borderColor='black'/>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>2:04</Text>
                    <Text style={styles.timeText}>4:12</Text>
                </View>
            </View>
            <View style={styles.playIconsContainer}>
                <TouchableOpacity>
                    <Image style={styles.repeatRandom} source={IMG_Repeat}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.preNext} source={IMG_Previous}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.play} source={IMG_Play}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.preNext} source={IMG_Next}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.repeatRandom} source={IMG_Random}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.lyricBox}>
                <View style={styles.lyricTop}>
                    <Text style={styles.titleText}>Lời bài hát</Text>
                    <TouchableOpacity>
                        <Image style={styles.up} source={IMG_Up}/>
                    </TouchableOpacity>
                </View>
                {lyrics !== undefined ? (
                    <ScrollView horizontal={true} style={{ width: "100%" }}>
                        <FlatList 
                            data={lyrics}
                            renderItem={({item}) => <Text style={styles.lyricText}>{item.words}</Text>}
                            keyExtractor={(item, index) => index}
                        />
                    </ScrollView>
                ) : (
                    <>
                        <Text style={styles.lyricText}>Loading lyrics</Text>
                        <Text style={styles.nowLyricText}>Loading lyrics</Text>
                    </>
                )}
            </ScrollView>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        width: '100%',
    },
    DVDContainer: {
        width: scale(360),
        height: scale(360),
        borderRadius: scale(180),
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(22),
    },
    nameArtistIconContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: scale(-32),
        alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    songText: {
        marginTop: scale(22),
        fontFamily: FONTS.NotoSans.Bold,
        fontSize: scale(24),
        lineHeight: scale(33),
        color: 'white',
    },
    artistText: {
        marginTop: scale(6),
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(18),
        lineHeight: scale(25),
        color: '#B1B5BB',
    },
    iconBox: {
        width: scale(32),
        height: scale(116),
        justifyContent: 'space-between',
    },
    icon: {
        width: scale(32),
        height: scale(32),
    },
    iconDots: {
        width: scale(4),
        height: scale(20),
        alignSelf: 'center',
    },
    progressTimeContainer: {
        marginTop: scale(20),
        width: scale(398),
        alignSelf: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        marginTop: scale(5),
        fontFamily: FONTS.NotoSans.Light,
        fontSize: scale(13),
        lineHeight: scale(15.6),
        color: '#748182',
    },
    playIconsContainer: {
        width: scale(365),
        height: scale(68),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    repeatRandom: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'stretch',
    },
    preNext: {
        width: scale(32),
        height: scale(32),
    },
    play: {
        width: scale(68),
        height: scale(68),
    },
    lyricBox: {
        width: scale(398),
        height: scale(161),
        marginTop: scale(20),
        alignSelf: 'center',
        backgroundColor: 'black',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        borderWidth: 1,
        borderColor: '#B1B5BB',
    },
    lyricTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: scale(50),
        marginLeft: scale(16),
        marginRight: scale(16),
        marginTop: scale(5),
    },
    up: {
        width: scale(32),
        height: scale(32),
    },
    titleText: {
        fontFamily: FONTS.NotoSans.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white',
    },
    lyricText: {
        marginHorizontal: scale(16),
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(12),
        lineHeight: scale(16),
        color: '#B1B5BB',
    },
    nowLyricText: {
        marginHorizontal: scale(16),
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(15),
        lineHeight: scale(20),
        color: 'white',
    },
    imgBackground: {
        width: scale(332), 
        height: scale(332), 
        borderRadius: scale(180), 
        resizeMode: 'cover', 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden'
    },
    smallCircle: {
        height: scale(88), 
        width: scale(88), 
        borderRadius: scale(44), 
        borderColor: '#748182', 
        borderWidth: 5, 
        backgroundColor: '#1E1E1E'
    }
});

