import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import scale from '../constants/responsive';

const OtherArtist = props => {
  return (
    <Container>
      <ImageContainer height={scale(120)} width={scale(120)}>
        <ArtistImage source={require('../assets/images/Artist.png')} />
      </ImageContainer>
      <Title>{props.title}</Title>
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

const ArtistImage = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const Title = styled.Text`
  width: 100%;
  color: #b1b5bb;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export default OtherArtist;