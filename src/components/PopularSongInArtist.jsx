import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import scale from '../constants/responsive';

export const PopularSongInArtist = props => {
  const item = props.item;

  const numberWithComma = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Container>
      <Number>{props.number}</Number>
      <MainContent>
        <ImageContainer height={scale(52)} width={scale(52)}>
          <SongImage
            source={
              !item.images
                ? require('../assets/images/Loading.png')
                : {uri: item.images[0].url}
            }
          />
          <StyleImage>
            <Round />
          </StyleImage>
        </ImageContainer>
        <TextContainer>
          <Name>{item.name}</Name>
          <Streaming>
            <Icon name="headphones" size={12} color="#b1b5bb" />
            <NumberCount>
              {numberWithComma(item.viewCount)} lượt nghe
            </NumberCount>
          </Streaming>
        </TextContainer>
      </MainContent>
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

const MainContent = styled.TouchableOpacity`
  flex-direction: row;
  flex: 7;
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
  flex: 1;
`;

const Name = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
`;

const Streaming = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NumberCount = styled.Text`
  color: #b1b5bb;
  font-family: 'Noto Sans';
  font-size: 12px;
  font-weight: 500;
  margin-left: 4px;
`;

const Detail = styled.TouchableOpacity`
  color: #b1b5bb;
  padding: 8px 0;
  flex: 1;
  align-items: flex-end;
`;
