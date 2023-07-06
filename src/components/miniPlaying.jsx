//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import scale from '../constants/responsive';
import * as Progress from 'react-native-progress';
import { PlayingContext } from '../constants/playingContext';
import { IMG_MiniPause, IMG_MiniPlay } from '../assets/images';
import FONTS from '../constants/fonts';
import SoundPlayer from 'react-native-sound';

// create a component
const MiniPlaying = (props) => {

    const [isPlaying, setIsPlaying] = useState();
    const { player2 } = useContext(PlayingContext);

    const id = '2nMeu6UenVvwUktBCpLMK9';

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
            return 'Loading...';
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

    SoundPlayer.setCategory('Playback');

    useEffect(()=>{
        if (player2)
            console.log('mini');
        console.log(player2);
        //player.resetPlayer(id);
    }, [player2.songInfo])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Playing', {type: 'back'}) } }>
                    <View style={styles.leftContainer}>
                        <View style={styles.image}>
                            <ImageBackground style={styles.imgBackground}
                                source={{ uri: player2?.songInfo.images !== undefined ? player2?.songInfo.images[0].url : "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" }}>
                                <View style={styles.smallCircle} />
                            </ImageBackground>
                        </View>
                        {/* <Image style={styles.image} source={{uri: 'https://i.scdn.co/image/ab67616d0000b27340d7efd2594a2b6bda60ea18'}}/> */}
                        <View style={{ marginLeft: scale(12) }}>
                            <Text style={styles.song}>{handleSongName(player2?.songInfo.name)}</Text>
                            <Text style={styles.otherText}>{handleArtistsName(player2?.songInfo.artists)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={player2?.status === 'play' ? player2?.pause : player2?.status === 'pause' ? player2.play : () => { } }
                    disabled={player2?.status !== 'play' && player2.status !== 'pause' ? true : false}>
                    <Image style={styles.icon} source={player2?.status === 'play' ? IMG_MiniPause : IMG_MiniPlay} />
                </TouchableOpacity>
            </View>
            <Progress.Bar 
                style={{alignSelf: 'center'}}
                progress={player2.duration !== 0 ? player2?.currentTime / player2.duration : 0} 
                width={scale(354)} 
                height={scale(3)}
                color='#FFFBFB' 
                unfilledColor='black' 
                borderColor='black'/>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        width: scale(388),
        height: scale(72),
        borderRadius: scale(20),
        backgroundColor: '#3B3939',
    },
    icon: {
        alignSelf: 'center',
        marginRight: scale(20),
    },
    image: {
        width: scale(48),
        height: scale(48),
        justifyContent: 'center',
        alignItems: 'center',
        //resizeMode: 'cover',
    },
    imgBackground: {
        width: scale(48), 
        height: scale(48), 
        borderRadius: scale(24), 
        resizeMode: 'cover', 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: scale(24),
        shadowOffset: {width: 0, height: 7},
        elevation: 8,
    },
    smallCircle: {
        height: scale(12), 
        width: scale(12), 
        borderRadius: scale(6), 
        borderColor: '#748182', 
        borderWidth: 1, 
        backgroundColor: '#1E1E1E'
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: scale(20),
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

//make this component available to the app
export default MiniPlaying;
