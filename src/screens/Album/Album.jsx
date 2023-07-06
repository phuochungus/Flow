import React, { useState, useEffect } from 'react';
import {View, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import scale from '../../constants/responsive';
import SongInAlbum from '../../components/SongInAlbum';
import PlayingSong from '../../components/PlayingSong';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default Album;

export const Album = () => {
  const [album, setAlbum] = useState({});
  const [artist, setArtist] = useState(null);
  const [description, setDescription] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [duration, setDuration] = useState();

  const id = '0S4pP8MBY9p7ngFWIZQAJv';
  //const id = route.params.id

  const total = (value) => {
    return new Date(value).toISOString().substr(11,8);
  }

  const loadAlbum = async () => {
    if (Object.keys(album).length === 0) {
      AsyncStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc5YTYzMzdkNzcyMDdjZDhjNDBlMzEiLCJpYXQiOjE2ODg0NDU4NDV9.CIN73r3GXK1n1sgmspC2RcsEY5VsOoTN-gesos_NUuk');
      const accessToken = await AsyncStorage.getItem('access_token')
      var myHeaders = new Headers();
      myHeaders.append("Authorization",  'Bearer ' + accessToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch('https://flow-fbmj.onrender.com/albums/album/' + id, requestOptions)
      .then(response => response.json())
      .then(result => {
        const obj = result.artists[0].name;
        const ob = result.images[0].url;
        setIsFavourite(result.isFavourite);
        setArtist(obj.toString());
        setDescription(ob.toString());
        setTracks(result.track);
        setDuration(result.total_duration);
        setAlbum(result);})
      .catch(error => console.log('error', error));
    }
  };

  const handleFavourite = async () => {
    AsyncStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc5YTYzMzdkNzcyMDdjZDhjNDBlMzEiLCJpYXQiOjE2ODg0NDU4NDV9.CIN73r3GXK1n1sgmspC2RcsEY5VsOoTN-gesos_NUuk');
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('accept', '*/*');
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: id,
    });

    if (!isFavourite) {
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };
    } else {
      var requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };
    }

    const response = await fetch(
      'https://flow-fbmj.onrender.com/me/favourites',
      requestOptions,
    ).catch(error => console.log('error', error));

    if (response.status >= 200) {
      setIsFavourite(!isFavourite);
    }
  };

useEffect(()=>{
  loadAlbum();
})
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
            <EntypoIcon name="chevron-thin-left" size={scale(24)} color="#fff" />
        </TouchableOpacity>
        <ScrollView style={styles.albumContainer}>
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.record} source={{uri: description}}>
                    <View style={styles.inRecord}></View>
                </ImageBackground>
                <ImageBackground style={styles.image} source={{uri: description}}></ImageBackground>
            </View>


            <View style={styles.box}>
                <TouchableOpacity style={styles.icon} onPress={handleFavourite}>
                  {
                    isFavourite === true ? (
                      <EntypoIcon name="heart" size={scale(36)} color="#E70DFB" />
                    ) : (
                      <EntypoIcon name="heart-outlined" size={scale(36)} color="grey"  />
                    )
                  }
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.nameAlbum}>{album.name}</Text>
                    <Text style={styles.nameArtist}>{artist}</Text>
                </View>
                <TouchableOpacity style={styles.icon}>
                    <FeatherIcon name="more-vertical" size={scale(32)} color="grey"/>
                </TouchableOpacity>
            </View>




          <TouchableOpacity  style={styles.button}>
            <LinearGradient style={styles.play} colors={['#0085FF', '#E70DFB']} start={{ x: -0.3, y: 0}} end={{ x: 1, y: 0}}>
              <Text style={styles.textPlay}>Phát tất cả</Text>
            </LinearGradient>
          </TouchableOpacity>


          <View style={[styles.playlist]}>
            <Text style={styles.time}>{total(duration)}</Text>
            {
              tracks.map((item, index) => {
                return <SongInAlbum item={item} />
              })
            }
        </View>
        </ScrollView>
      </SafeAreaView>
  );
};






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
        fontFamily: 'Radio Canada'
    },
    nameArtist: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
        fontFamily: 'Radio Canada'
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