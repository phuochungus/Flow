//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, FlatList, ImageBackground, ToastAndroid } from 'react-native';
import BackHeader from '../../components/back-header';
import { IMG_AddPlaylist, IMG_BackDown, IMG_Dots, IMG_Like, IMG_Liked, IMG_Next, IMG_Pause, IMG_PinkRandom, IMG_PinkRepeat, IMG_Play, IMG_Previous, IMG_Random, IMG_Repeat, IMG_Up } from '../../assets/images';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundPlayer from 'react-native-sound';
import Slider from '@react-native-community/slider';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { PlayingContext } from '../../constants/playingContext';
import { addToPlaylist } from '../../constants/function';


// create a component
export const Playing = ({navigation, route}) => {

    const [isUpLyrics, setIsUpLyrics] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const { player2 } = useContext(PlayingContext);

    SoundPlayer.setCategory('Playback');


    // type === 'back' => navigate from miniPlaying
    // type === 'single' => navigate from a Song
    // type === 'list' => navigate from playlist

    const list = route.params.list;
    const id = route.params.id;
    const type = route.params.type;
    //const type = 'back';

    const setLstSound = async () => {
        let lst = [];
        if (type === 'list') { 
            await player2.setListSounds(list);
            lst = list;
            await AsyncStorage.setItem('list-sound', JSON.stringify(lst));
        }
        else if (type === 'single') {
            await player2.setListSounds([{'id': id}]);
            lst = [{'id': id}]
            await AsyncStorage.setItem('list-sound', JSON.stringify(lst));
        }
        else if (type === 'back') {

        }
    }

    useEffect(()=>{
        setLstSound();
    }, [])

    useEffect(()=>{

    }, [player2.songInfo, player2.lyrics, player2.index])

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

    return (
        <ScrollView style={styles.container}>
            <View style={{opacity: isUpLyrics !== false ? 0 : 1}}>
                <BackHeader onLeftButtonPressed={()=>Alert.alert("left button pressed")} img={IMG_BackDown} navigation={navigation}/>
                <View style={styles.DVDContainer}>
                    <ImageBackground style={[styles.imgBackground, {transform: [{rotate: '0deg'}],}]} source={{uri: player2?.songInfo.images !== undefined ? player2?.songInfo.images[0].url : "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg"}}>
                        <View style = {styles.smallCircle}/>
                    </ImageBackground>
                </View>
                <View style={styles.nameArtistIconContainer}>
                    <View>
                        <Text style={styles.songText}>{handleSongName(player2?.songInfo.name)}</Text>
                        <Text style={styles.artistText}>{player2?.songInfo.artists !== undefined ? handleArtistsName(player2?.songInfo.artists) : "Loading..."}</Text>
                    </View>
                    <View style={styles.iconBox}>
                        <View style={{height: scale(32)}}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('Playlist')}>
                            <FeatherIcon name='list' size={scale(32)} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={!player2?.songInfo.isFavourite ? 
                                                    ()=>{player2?.handleFavorites('POST'); ToastAndroid.show('Đã thêm vào yêu thích', ToastAndroid.SHORT); setIsFavorite(!isFavorite)} : 
                                                    ()=>{player2?.handleFavorites('DELETE'); ToastAndroid.show('Đã xóa khỏi yêu thích', ToastAndroid.SHORT);setIsFavorite(!isFavorite)}}>
                            <Image style={styles.icon} source={player2?.songInfo.isFavourite ? IMG_Liked : IMG_Like}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
           
            <View style={styles.progressTimeContainer}>
                <Slider style={{width: scale(398), height: scale(6)}} 
                        minimumValue={0}
                        maximumValue={player2?.duration}
                        value={player2?.currentTime}
                        minimumTrackTintColor="#E70DFB"
                        maximumTrackTintColor="black"
                        thumbTintColor='#E70DFB'
                        onTouchStart={player2?.pause}
                        onTouchEnd={player2?.play}
                        onSlidingComplete={(seconds) => player2?.seekToTime(seconds)}/>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{player2?.currentTimeString}</Text>
                    <Text style={styles.timeText}>{player2?.durationString}</Text>
                </View>
            </View>
            <View style={styles.playIconsContainer}>
                <TouchableOpacity onPress={player2 ? player2.loop : ()=>{}}>
                    <Image style={styles.repeatRandom} source={player2?.isLoop ? IMG_PinkRepeat : IMG_Repeat}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={player2 ? player2.previous : ()=>{}} 
                                    disabled={player2 ? player2.isDisabledButtonPrevious : ()=> {}}> 
                    <Image style={[styles.preNext, {opacity: player2?.isDisabledButtonPrevious === false ? 1 : 0.2}]} source={IMG_Previous}/>
                </TouchableOpacity>
                {
                    player2?.status === 'play' ? (
                        <TouchableOpacity onPress={player2 ? player2.pause : ()=>{}} 
                                            disabled={player2 ? player2.isDisabledButtonPause : ()=> {}}>
                            <Image style={[styles.play, {opacity: player2?.isDisabledButtonPause === false ? 1 : 0.2}]} source={IMG_Pause}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={player2 ? player2.play : ()=>{}} 
                                            disabled={player2 ? player2.isDisabledButtonPlay : ()=> {}}>
                            <Image style={[styles.play, {opacity: player2?.isDisabledButtonPlay === false ? 1 : 0.2}]} source={IMG_Play}/>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity onPress={player2 ? player2.next : ()=>{}} 
                                    disabled={player2 ? player2.isDisabledButtonNext : ()=> {}}>
                    <Image style={[styles.preNext, {opacity: player2?.isDisabledButtonNext === false ? 1 : 0.2}]} source={IMG_Next}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={player2 ? player2.shuffle : ()=>{}}>
                    <Image style={styles.repeatRandom} source={player2?.isShuffle ? IMG_PinkRandom : IMG_Random}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={isUpLyrics !== false ? styles.largeLyricBox : styles.lyricBox}>
                <View style={styles.lyricTop}>
                    <Text style={styles.titleText}>Lời bài hát</Text>
                    <TouchableOpacity onPress={isUpLyrics !== false ? ()=>setIsUpLyrics(false) : ()=>setIsUpLyrics(true)}>
                        <Image style={[styles.up, {transform: [{rotate: isUpLyrics !== false ? '180deg' : '0deg'}],}]} source={IMG_Up}/>
                    </TouchableOpacity>
                </View>
                {player2?.lyrics !== undefined ? (
                    <ScrollView horizontal={true} style={{ width: "100%" }}>
                        <FlatList 
                            data={player2?.lyrics}
                            renderItem={({item, index}) => 
                                <Text style={(player2?.currentTime * 1000 < player2?.lyrics[index + 1]?.startTimeMs && player2?.currentTime * 1000 >= item.startTimeMs) ? styles.nowLyricText : styles.lyricText}>{item.words}</Text>}
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
        shadowColor: 'black',
        elevation: 15,
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
    largeLyricBox: {
        position: 'absolute',
        width: scale(398),
        height: scale(500),
        alignSelf: 'center',
        backgroundColor: '#1E1E1E',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        //borderWidth: 1,
        //borderColor: '#B1B5BB',
    },
    lyricBox: {
        width: scale(398),
        height: scale(190),
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
        width: scale(366),
        color: '#B1B5BB',
    },
    nowLyricText: {
        marginHorizontal: scale(16),
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(15),
        lineHeight: scale(20),
        width: scale(366),
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

