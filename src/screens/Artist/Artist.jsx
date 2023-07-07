import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import {
  OtherArtist,
  PopularSongInArtist,
  PopularAlbum,
} from '../../components/';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import scale from '../../constants/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniPlaying from '../../components/miniPlaying';

export const Artist = ({route, navigation}) => {
  const id = route.params.id;
  const [artist, setArtist] = useState({});
  const [description, setDescription] = useState(null);
  const [isFavourite, setIsFavourite] = useState(null);
  const [list, setList] = useState([]);

  const loadArtist = async () => {
    if (Object.keys(artist).length === 0) {
      const accessToken = await AsyncStorage.getItem('access_token');

      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);

      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
      };

      fetch(
        'https://flow-fbmj.onrender.com/artists/v2/artist/' + id,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setArtist(result);
          setDescription(result?.bio ? result.bio.summary : '');
          setIsFavourite(result?.isFavourite);
          let l = [];
          result.topTracks.map((item, index)=>{ let id = item.id; l.push({id: id}); })
          setList(l);
        })
        .catch(error => console.log('error', error));
    }
  };

  const handleFavourite = async () => {
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

  useEffect(() => {
    loadArtist();
  }, [isFavourite]);

  const longText = text => {
    if (text.length > 200) {
      return text.substring(0, 200) + ' ...';
    } else return text;
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#121212'}}>
        <ImageContainer height={scale(300)}>
          <ArtistImage
            style={{resizeMode: 'contain'}}
            source={
              !artist.images
                ? require('../../assets/images/Loading.png')
                : {uri: artist.images[0]?.url}
            }
          />

          {/* <BackButton>
      <EntypoIcon name="chevron-thin-left" size={24} color="#fff" />
    </BackButton> */}
          <LinearBackground height={scale(120)} />
          <BottomOfImage>
            <TextContainer>
              <NameArtist>
                {artist.name == undefined ? 'Loading...' : artist.name}
              </NameArtist>
              {/* <Streaming>
      <FeatherIcon name="headphones" size={16} color="#fff" />
      <Number>{numberWithComma(100000)} lượt nghe hàng tháng</Number>
    </Streaming> */}
            </TextContainer>
            {/* <DetailContainer>
      <DetailButton height={scale(32)} width={scale(32)}>
        <EntypoIcon name="dots-three-vertical" size={20} color="#fff" />
      </DetailButton>
    </DetailContainer> */}
        </BottomOfImage>
      </ImageContainer>

      <Description>
        {description == undefined ? 'Loading...' : longText(description)}
      </Description>

      <ButtonContainer>
        {/* Follow */}
        <GradientBackground height={scale(48)} width={scale(160)}>
          {isFavourite ? (
            <FollowingButton onPress={handleFavourite}>
              <FollowText>Đang theo dõi</FollowText>
            </FollowingButton>
          ) : (
            <UnfollowingButton onPress={handleFavourite}>
              <FollowText>Theo dõi</FollowText>
            </UnfollowingButton>
          )}
        </GradientBackground>

        {/* PlayRandomButton */}
        <PlayRandomButton height={scale(60)} width={scale(62)} onPress={list.length > 0 ? ()=>{navigation.navigate('Playing', {type: 'list', list: list})} : ()=>{console.log('fail')}}>
          <PlayBackground height={scale(54)} width={scale(54)}>
            <FontAwesomeIcon name="play" size={20} color="#000" />
          </PlayBackground>
          <RandomBorder>
            <RandomBackground>
              <FontAwesomeIcon
                name="random"
                size={10}
                color="rgba(231, 13, 251, 1)" />
            </RandomBackground>
          </RandomBorder>
        </PlayRandomButton>

        {/* Share */}
        {/* <ShareButton height={scale(54)} width={scale(54)}>

      <ShareBorder>
        <ShareBackground>
          <FeatherIcon name="share-2" size={24} color="#E70DFB" />
        </ShareBackground>
      </ShareBorder>
    </ShareButton> */}
        </ButtonContainer>

        <Section>
          <TitleContainer>
            <Title>Bài hát nổi bật</Title>
          </TitleContainer>
          {artist.topTracks !== undefined &&
            artist.topTracks
              .sort((a, b) => (a.viewCount < b.viewCount ? 1 : -1))
              .filter((item, index) => index < 5)
              .map((item, index) => (
                <PopularSongInArtist
                  item={item}
                  key={index}
                  number={index + 1}
                  navigation={navigation}
                />
              ))}
        </HorizontalScroll>
      </Section>

      <Section>
        <TitleContainer>
          <Title>Nghệ sĩ bạn có thể theo dõi</Title>
        </TitleContainer>
        <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
          {artist.relatedArtists !== undefined &&
            artist.relatedArtists.map((item, index) => (
              <OtherArtist item={item} key={index} navigation={navigation} />
            ))}
        </HorizontalScroll>
      </Section>
      <View style={{height: scale(10), backgroundColor: '#121212'}}/>
    </ScrollView>
    <MiniPlaying navigation={navigation} /></>
  );
};

const ImageContainer = styled(View)`
  width: 100%;
  height: ${props => props.height}px;
  position: relative;
`;

const ArtistImage = styled.Image`
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 12px;
  padding: 8px;
  border-radius: 50px;
`;

const BottomOfImage = styled.View`
  position: absolute;
  bottom: 0px;
  margin: 0px 60px 8px 60px;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const NameArtist = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 28px;
  font-weight: 700;
`;

const Streaming = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const Number = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 12px;
  font-weight: 500;
  margin-left: 4px;
`;

const DetailContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
`;

const DetailButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const LinearBackground = styled(LinearGradient).attrs({
  colors: ['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 1)'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0, 1],
  useAngle: true,
  angle: 180,
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.height}px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const Description = styled.Text`
  align-items: center;
  justify-content: center;
  color: #8e96a2;
  margin: 12px 40px 0px 40px;
  text-align: center;
  font-family: 'Noto Sans';
  font-weight: 400;
  font-size: 13px;
`;

const ButtonContainer = styled.View`
  margin: 28px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlayRandomButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;

  width: ${props => props.width}px;
  position: absolute;
  left: 0;
`;

const PlayBackground = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 50px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
`;

const RandomBorder = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  position: absolute;
  padding: 0.5px;
  bottom: 0;
  right: 0;
  border-radius: 50px;
`;

const RandomBackground = styled.View`
  background-color: #1e1e1e;
  padding: 6px;
  border-radius: 50px;
`;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1188, 0.8163],
  useAngle: true,
  angle: 98.99,
})`
  align-items: center;
  justify-content: center;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border-radius: 50px;
  margin: auto;
  padding: 1px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const FollowingButton = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const UnfollowingButton = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

const FollowText = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-weight: 600;
  font-size: 16px;
`;

const ShareButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: gray;
`;

const ShareBorder = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 50px;
  width: 100%;
  height: 100%;
  padding: 1px;
`;

const ShareBackground = styled.View`
  background-color: #121212;
  border-radius: 50px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Section = styled.View`
  margin: 0 15px 40px 15px;
  padding: 16px;
  background-color: #1e1e1e;
  border-radius: 20px;
  border: 0.5px solid #b1b5bb;
`;

const Title = styled.Text`
  color: white;

  font-family: 'Radio Canada';
  font-size: 24px;
  font-weight: 700;
  flex: 1;
  margin-right: 12px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const ViewAll = styled.Text`
  color: #e70dfb;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-weight: 500;
`;

const HorizontalScroll = styled.ScrollView`
  flex-direction: row;
`;
