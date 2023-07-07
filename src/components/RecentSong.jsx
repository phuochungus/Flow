import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RecentSong = props => {
  const id = props.id.toString();
  const [track, setTrack] = useState([]);
  const [artist, setArtist] = useState([]);
  const [image, setImage] = useState([]);

  const loadTrack = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      fetch('https://flow-fbmj.onrender.com/tracks/track/' + id, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTrack(result);
        setArtist(result.artists);
        setImage(result.images[0]);
        //console.log(id);
      })
      .catch(error => console.log('error', error));
    
  };

  useEffect(()=>{
    loadTrack();
  },[]);

  return (
    <Container>
      <MainDetail>
        <ImageContainer>
          <Image source={(!image || image.url == null)
              ? require('../assets/images/Loading.png')
              :{uri: image.url}} />
          <StyleImage>
            <Round />
          </StyleImage>
        </ImageContainer>
        <TextContainer>
          <Title>{track.name}</Title>
          <Streaming>
            {
              artist.length !== 1 ?
              artist.map((item, index) => {
                return (index + 1) === artist.length ? item.name : item.name + ' && ';
              })
              : 
              artist.map((item, index) => {
                return item.name;
              })
            }
          </Streaming>
        </TextContainer>
      </MainDetail>
      <Detail onPress={()=>{
        props.navigation.navigate("Playing", {type: 'single', id: id})
      }}>
        <LinearBackground>
          <Triangle/>
        </LinearBackground>
      </Detail>
    </Container>
  );
};



const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 0;
  width: 95%;
  background-color: #121212;
  border-radius: 50px;
  margin-bottom: 10px;
`;


const MainDetail = styled.TouchableOpacity`
  flex-direction: row;
  width: 75%;
  margin: 0 20px;
`;


const ImageContainer = styled.View`
  width: 58px;
  height: 58px;
  position: relative;
  margin-right: 12px;
`;


const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;


const StyleImage = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;


const Round = styled.View`
  width: 32%;
  height: 32%;
  border-radius: 50px;
  background-color: #1e1e1e;
  border: 1px solid #748182;
`;


const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
`;


const Title = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
`;


const Streaming = styled.Text`
  color: grey;
  font-family: 'Noto Sans';
  font-size: 12px;
  font-weight: 500;
`;


const Detail = styled.TouchableOpacity`
  color: red;
  padding: 8px 0;
  width: 30px;
  height: 30px;
  transform: rotate(90deg);
`;


const Triangle = styled.View`
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-left-width: 7px;
  border-right-width: 7px;
  border-bottom-width: 14px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: black;
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
  width: 35px;
  height: 35px;
  border-radius:50px;
  align-items: center;
  justify-content: center;
`;


export default RecentSong;



