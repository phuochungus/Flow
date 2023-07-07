import React, {useEffect, useState} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export const Favourite = ({route, navigation}) => {
  const [favourites, setFavourites] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  const loadFavourite = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    if (favourites.length === 0) {
      await fetch(
        'https://flow-fbmj.onrender.com/me/favourites',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setFavourites(result);
        })
        .catch(error => console.log('error', error));
    }
  };

  const loadArtist = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    if (favourites.length !== 0 && artists.length == 0) {
      for (let i = 0; i < favourites.length; i++) {
        fetch(
          'https://flow-fbmj.onrender.com/artists/v2/artist/' + favourites[i],
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            if (result.id)
              setArtists(old => [
                ...old,
                {id: result.id, name: result.name, images: result.images},
              ]);
          })
          .catch(error => console.log('error', error));
      }
    }
  };

  const loadAlbum = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    if (favourites.length !== 0 && albums.length == 0) {
      for (let i = 0; i < favourites.length; i++) {
        fetch(
          'https://flow-fbmj.onrender.com/albums/album/' + favourites[i],
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            if (result.id)
              setAlbums(old => [
                ...old,
                {
                  id: result.id,
                  name: result.name,
                  artists: result.artists,
                  images: result.images,
                },
              ]);
          })
          .catch(error => console.log('error', error));
      }
    }
  };

  const loadTrack = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    if (favourites.length !== 0 && albums.length == 0) {
      for (let i = 0; i < favourites.length; i++) {
        fetch(
          'https://flow-fbmj.onrender.com/tracks/track/' + favourites[i],
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            if (result.id)
              setTracks(old => [
                ...old,
                {
                  id: result.id,
                  name: result.name,
                  artists: result.artists,
                  images: result.images,
                },
              ]);
          })
          .catch(error => console.log('error', error));
      }
    }
  };

  useEffect(() => {
    loadFavourite();
    loadTrack();
    loadArtist();
    loadAlbum();
  }, [favourites]);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Title>Yêu thích</Title>

      {tracks.length !== 0 ? (
        <Section>
          <TitleSection>Bài hát yêu thích</TitleSection>
          {tracks.map((item, index) => {
            return (
              <ItemContainer
                key={index}
                onPress={() => {
                  navigation.navigate('Playing', {type: 'signle', id: item.id});
                }}>
                <ArtistImage
                  width={scale(72)}
                  height={scale(72)}
                  style={{resizeMode: 'contain'}}
                  source={
                    !item.images
                      ? require('../../assets/images/Loading.png')
                      : {uri: item.images[0]?.url}
                  }
                />
                <TextContainer>
                  <Name>{item.name}</Name>
                  <ArtistContainer>
                    {item.artists.map((value, index) => {
                      return (
                        <ArtistItem key={value.id}>
                          <Artist key={index}>{value.name}</Artist>
                          {item.artists[index + 1] && (
                            <EntypoIcon
                              name="dot-single"
                              size={16}
                              color="#dadada"
                            />
                          )}
                        </ArtistItem>
                      );
                    })}
                  </ArtistContainer>
                </TextContainer>
              </ItemContainer>
            );
          })}
        </Section>
      ) : (
        <PlainContent>Bạn chưa thêm bài hát yêu thích nào</PlainContent>
      )}

      {artists.length !== 0 ? (
        <Section>
          <TitleSection>Nghệ sĩ bạn đang theo dõi</TitleSection>

          {artists.map((item, index) => {
            return (
              <ItemContainer
                key={index}
                onPress={() => {
                  navigation.navigate('Artist', {id: item.id});
                }}>
                <ArtistImage
                  width={scale(72)}
                  height={scale(72)}
                  style={{resizeMode: 'contain'}}
                  source={
                    !item.images
                      ? require('../../assets/images/Loading.png')
                      : {uri: item.images[0]?.url}
                  }
                />
                <TextContainer>
                  <Name>{item.name}</Name>
                </TextContainer>
              </ItemContainer>
            );
          })}
        </Section>
      ) : (
        <PlainContent>Bạn chưa theo dõi nghệ sĩ nào</PlainContent>
      )}

      {albums.length !== 0 ? (
        <Section>
          <TitleSection>Album yêu thích</TitleSection>
          {albums.map((item, index) => {
            return (
              <ItemContainer
                key={index}
                onPress={() => {
                  navigation.navigate('Album', {id: item.id});
                }}>
                <ImageContainer width={scale(112)} height={scale(72)}>
                  <CircleContainer width={scale(72)} height={scale(72)}>
                    <Circle
                      imageStyle={{borderRadius: 100}}
                      width={scale(64)}
                      height={scale(64)}
                      source={
                        !item.images
                          ? require('../../assets/images/Loading.png')
                          : {uri: item.images[1]?.url}
                      }>
                      <Round />
                    </Circle>
                  </CircleContainer>
                  <Rectangle
                    width={scale(72)}
                    height={scale(72)}
                    source={
                      !item.images
                        ? require('../../assets/images/Loading.png')
                        : {uri: item.images[0]?.url}
                    }
                  />
                </ImageContainer>
                <TextContainer>
                  <Name>{item.name}</Name>
                  <ArtistContainer>
                    {item.artists.map((value, index) => {
                      return (
                        <ArtistItem key={value.id}>
                          <Artist key={index}>{value.name}</Artist>
                          {item.artists[index + 1] && (
                            <EntypoIcon
                              name="dot-single"
                              size={16}
                              color="#dadada"
                            />
                          )}
                        </ArtistItem>
                      );
                    })}
                  </ArtistContainer>
                </TextContainer>
              </ItemContainer>
            );
          })}
        </Section>
      ) : (
        <PlainContent>Bạn chưa yêu thích album nào</PlainContent>
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 15px;
  background-color: #121212;
`;

const Title = styled.Text`
  font-family: '${FONTS.RadioCanada.Bold}';
  font-size: 24px;
  color: white;
`;

const Section = styled.View`
  margin: 20px 0px 0px;
  border-bottom: 1px solid #b1b5bb;
`;

const TitleSection = styled.Text`
  font-family: 'Radio Canada';
  font-size: 20px;
  color: white;
  margin-bottom: 16px;
`;

const ItemContainer = styled.Pressable`
  width: 100%;
  padding: 0px 8px 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ArtistImage = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 50px;
`;

const ImageContainer = styled(View)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const CircleContainer = styled(View)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
`;

const Circle = styled(ImageBackground).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  flex: 1;
`;

const Name = styled.Text`
  color: white;
  font-family: Radio Canada;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ArtistContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const ArtistItem = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const Artist = styled.Text`
  font-family: Noto Sans;
  font-size: 13px;
  font-weight: 400;
  color: #dadada;
`;

const Round = styled.View`
  width: 32%;
  height: 32%;
  border-radius: 50px;
  background-color: #1e1e1e;
  border: 1px solid #748182;
`;

const Rectangle = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const PlainContent = styled.Text`
  width: 100%;
  color: white;
  font-family: Radio Canada;
  font-size: 18px;
  text-align: center;
`;
