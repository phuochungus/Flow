import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import scale from '../constants/responsive';

const PopularAlbum = props => {
  return (
    <Container>
      <ImageContainer height={scale(120)} width={scale(120)}>
        <AlbumImage source={require('../assets/images/Artist.png')} />
      </ImageContainer>
      <TextContainer>
        <Title>{props.title}</Title>
        <Year>{props.yearPublish}</Year>
      </TextContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 12px;
`;

const ImageContainer = styled(View)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  margin-bottom: 12px;
`;

const AlbumImage = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-weight: 700;
`;

const Year = styled.Text`
  color: #b1b5bb;
`;

export default PopularAlbum;