//import liraries
import React, { Component, useSyncExternalStore } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, SliderBase } from 'react-native';
import * as Progress from 'react-native-progress';
import BackHeader from '../../components/back-header';
import { IMG_AddPlaylist, IMG_BackDown, IMG_Dots, IMG_Like, IMG_Next, IMG_Play, IMG_Previous, IMG_Random, IMG_Repeat, IMG_Up } from '../../assets/images';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';

// create a component
const Playing = () => {
    return (
        <ScrollView style={styles.container}>
            <BackHeader onLeftButtonPressed={()=>Alert.alert("left button pressed")} img={IMG_BackDown}/>
            <View style={styles.DVDContainer}>
                
            </View>
            <View style={styles.nameArtistIconContainer}>
                <View>
                    <Text style={styles.songText}>ưng quá chừng</Text>
                    <Text style={styles.artistText}>Amee</Text>
                </View>
                <View style={styles.iconBox}>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={IMG_Like}/>
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
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.nowLyricText}>Sao mà bây giờ đây, vũ trụ em chỉ thấy anh thôi đấy</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
                <Text style={styles.lyricText}>Sao hôm nay, lại cứ ngẩn ngơ thế này</Text>
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
        alignSelf: 'center',
        marginTop: scale(22),
        backgroundColor: 'gray',
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
    }
});

//make this component available to the app
export default Playing;
