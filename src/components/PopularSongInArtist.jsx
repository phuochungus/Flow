import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import scale from '../constants/responsive';

const PopularSongInArtist = props => {
  return (
    <Container>
      <Number>{props.number}</Number>
      <MainDetail>
        <ImageContainer height={scale(52)} width={scale(52)}>
          <SongImage source={require('../assets/images/Artist.png')} />
          <StyleImage>
            <Round />
          </StyleImage>
        </ImageContainer>
        <TextContainer>
          <Title>{props.nameSong}</Title>
          <Streaming>{props.numberStreaming}</Streaming>
        </TextContainer>
      </MainDetail>
      <Detail>
        <Icon name="dots-horizontal" size={28} color="#fff" />
      </Detail>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 0;
`;

const Number = styled.Text`
  font-family: 'Noto Sans';
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

const MainDetail = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  margin: 0 20px;
`;

const ImageContainer = styled.View`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: relative;
  margin-right: 12px;
`;

const SongImage = styled.Image`
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
`;

const Title = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
`;

const Streaming = styled.Text`
  color: #b1b5bb;
  font-family: 'Noto Sans';
  font-size: 12px;
  font-weight: 500;
`;

const Detail = styled.TouchableOpacity`
  color: #b1b5bb;
  padding: 8px 0;
`;

export default PopularSongInArtist;