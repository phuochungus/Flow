import React from 'react';
import {View, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PopularSongInArtist from '../../components/PopularSongInArtist';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import scale from '../../constants/responsive';
import SongInAlbum from '../../components/SongInAlbum';
import styled from 'styled-components';
import PlayingSong from '../../components/PlayingSong';


export const Album = () => {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
            <EntypoIcon name="chevron-thin-left" size={24} color="#fff" />
        </TouchableOpacity>
        <ScrollView style={styles.albumContainer}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.record} source={require('../../assets/images/Artist.png')}>
                    <View style={styles.inRecord}></View>
                </ImageBackground>
                <ImageBackground style={styles.image} source={require('../../assets/images/Artist.png')}></ImageBackground>
            </View>


            <View style={styles.box}>
                <TouchableOpacity style={styles.icon}>
                    <FeatherIcon name="heart" size={32} color="grey"/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.nameAlbum}>BORN PINK</Text>
                    <Text style={styles.nameArtist}>BLACKPINK</Text>
                    <Text style={styles.text}>Album • 2022</Text>
                </View>
                <TouchableOpacity style={styles.icon}>
                    <FeatherIcon name="more-vertical" size={32} color="grey"/>
                </TouchableOpacity>
            </View>




          <TouchableOpacity  style={styles.button}>
            <LinearGradient style={styles.play} colors={['#0085FF', '#E70DFB']} start={{ x: -0.3, y: 0}} end={{ x: 1, y: 0}}>
              <Text style={styles.textPlay}>Phát tất cả</Text>
            </LinearGradient>
          </TouchableOpacity>


          <View style={[styles.playlist]}>
            <Text style={styles.time}>00:00</Text>
            <SongInAlbum nameSong="Tên bài hát" nameArtist="BLACKPINK"/>
            <SongInAlbum nameSong="Tên bài hát" nameArtist="BLACKPINK"/>
            <SongInAlbum nameSong="Tên bài hát" nameArtist="BLACKPINK"/>
            <SongInAlbum nameSong="Tên bài hát" nameArtist="BLACKPINK"/>
        </View>
        </ScrollView>
        <PlayingSong nameSong="BORN PINK" artist="Amee"/>
      </SafeAreaView>
  );
};


export default Album;




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
    backButton: {
        paddingTop: scale(20),
        paddingLeft: scale(12),
    },
    albumContainer: {
        flex: 1,
        backgroundColor: '#121212',
        width: '100%',
        paddingTop: scale(16),
      },
    imageContainer: {
        width: '100%',
        height: scale(240),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    record: {
        width: scale(106), height: scale(212),
        resizeMode: 'center',
        overflow: 'hidden',
        borderRadius: 212,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginLeft: scale(10)
    },
    inRecord: {
        width: scale(28), height: scale(56),
        backgroundColor: '#121212',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'grey',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end',
        borderRightWidth: 0
    },
    image: {
        width: scale(240), height: scale(240),
        resizeMode: 'center',
        overflow: 'hidden',
        borderRadius: 12,
    },  
    listArtist: {
      flexDirection: 'row',
    },
 
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scale(20),
      width: scale(132), height: scale(40),
      alignSelf: 'center'
    },
    play: {
      width: scale(132), height: scale(40),
      borderRadius: 20,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textPlay: {
      color: '#fff',
      fontSize: scale(18),
      fontWeight: '700'
    },
    playlist: {
      width: '100%',
      backgroundColor: '#121212',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 20,
      marginTop: scale(24),
      paddingVertical: scale(10),
      marginBottom: 20,
    },
    time: {
      fontSize: scale(15),
      color: '#0085FF',
      alignSelf: 'center',
      marginTop: scale(20)
    },


    box: {
        width: '100%',
        height: scale(95),
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: scale(20),
        backgroundColor: '#121212',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameAlbum: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    nameArtist: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
        color: 'grey'
    },
    note: {
        width: 4,
        height: 4,
        borderRadius: 2,
        borderColor: 'grey',
        borderWidth: 2,
        alignSelf: 'center',
        marginHorizontal: 5
    },  
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

