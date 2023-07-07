import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableHighlight, Text} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import OtherArtist from '../../components/OtherArtist';
import PopularAlbumInHome from '../../components/PopularAlbumInHome';
import RecentSong from '../../components/RecentSong';
import FamousArtist from '../../components/FamousArtist';
import MiniPlaying from '../../components/miniPlaying';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = ({route, navigation}) => {
  //const [id, setId] = useState(route.params.id);
  const [song, setSong] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  const loadUser = async () => {
    if (Object.keys(album).length === 0) {
      const accessToken = await AsyncStorage.getItem('access_token');

      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);

      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      fetch('https://flow-fbmj.onrender.com/me/profile', requestOptions)
      .then(response => response.json())
      .then(result => {
        setUser(result);
        setItems(result.recentlyPlayed);
        //console.log(result.recentlyPlayed);
      })
      .catch(error => console.log('error', error));
    }
  };

  const loadTrack = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://flow-fbmj.onrender.com/tracks/top50', requestOptions)
      .then(response => response.json())
      .then(result => {
        setAlbum(result);
        //console.log(result);
        //var obj = result.images[0].url;
        //setItems(obj.toString());
      })
      .catch(error => console.log('error', error));
  };

  const loadArtist = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://flow-fbmj.onrender.com/artists/typical_artists',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => result.slice(0, 10))
      .then(result => {
        setArtist(result);
        //console.log(result);
        //var obj = result.images[0].url;
        //setItems(obj.toString());
      })
      .catch(error => console.log('error', error));
  };

  const loadSong = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: '4W2poMwGzKQHtpNCthoGhC',
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      //body: raw,
      redirect: 'follow',
    };

    fetch('https://flow-fbmj.onrender.com/me/play_history', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    loadTrack();
    loadArtist();
    //loadSong();
    loadUser();
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <User>
            <Avata>
                <LinearBackground>
                  <FeatherIcon name="user" size={28} color="#fff"/>
                </LinearBackground>
            </Avata>
            <TextUser>
              <Welcome>Welcome back !</Welcome>
              <Name>{user.username}</Name>
            </TextUser>
            {/* <Icon>
              <FeatherIcon name="bar-chart-2" size={22} color="#fff" />
            </Icon>
            <Icon>
              <FeatherIcon name="bell" size={22} color="#fff" />
            </Icon> */}
          </User>
          <ListSong>
            <TitleContainer>
                <Title>Mới nghe gần đây</Title>
            </TitleContainer>
            <SongContainer>
              {items.slice(0, 3).map((item, index) => {
                return <RecentSong key={index} id={item} />;
              })}
            </SongContainer>
          </ListSong>
          <ListAlbum>
            <TitleContainer>
              <Title>Bài hát nổi bật</Title>
            </TitleContainer>
            <AlbumContainer horizontal={true}>
              {album.slice(0, 10).map((item, index) => {
                //console.log(item);
                return <PopularAlbumInHome key={index} item={item} />;
              })}
            </AlbumContainer>
          </ListAlbum>
          <TitleContainer>
            <Title>Nghệ sĩ nổi bật</Title>
          </TitleContainer>
          <ArtistContainer horizontal={true}>
            {artist.slice(0, 10).map((item, index) => {
              return (
                <FamousArtist
                  key={index}
                  navigation={navigation}
                  item={item}
                  uri={item.images[0].url.toString()}
                  title={item.name}
                />
              );
            })}
          </ArtistContainer>
        </Container>
      </ScrollView>
      <MiniPlaying navigation={navigation} />
    </>
  );
};

export default Home;

const Container = styled(View)`
  background-color: black;
  flex: 1;
  padding-top: 20px;
`;

const User = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-left: 20px;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Avata = styled.View`
  width: 40px;
  height: 40px;
`;

const TextUser = styled.View`
  flex-direction: column;
  margin-left: 10px;
  width: 55%;
`;

const Name = styled.Text`
  color: grey;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
`;

const Welcome = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 18px;
  font-weight: 700;
`;

const ListSong = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: grey;
  padding: 5px;
  border-radius: 20px;
  margin: 20px 0px;
  background-color: #1e1e1e;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  margin-left: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  align-items: center;
`;

const SongContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 24px;
  font-weight: 700;
  margin-right: 12px;
  width: 70%;
`;

const History = styled.Text`
  color: #e70dfb;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
  margin-right: 12px;
`;

const ListAlbum = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: grey;
  padding: 5px;
  border-radius: 20px;
  margin-vertical: 20px;
  background-color: #1e1e1e;
`;

const AlbumContainer = styled.ScrollView`
  flex-direction: row;
`;

const ArtistContainer = styled.ScrollView`
  flex-direction: row;
  flex: 1;
  padding: 10px;
  margin-left: 5px;
`;

const LinearBackground = styled(LinearGradient).attrs({
  colors: ['rgba(231, 13, 251, 1)', 'rgba(0, 133, 255, 1)'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0, 1],
  useAngle: true,
  angle: 180,
})`
  position: absolute;
  bottom: 0;
  width: 44px;
  height: 44px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
