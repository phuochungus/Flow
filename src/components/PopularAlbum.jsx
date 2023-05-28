import React from 'react';
import styled from 'styled-components/native';

const PopularAlbum = props => {
  return (
    <Container>
      <ImageContainer>
        <Image source={require('../assets/images/Artist.png')} />
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
  margin-right: 16px;
`;

const ImageContainer = styled.View`
  width: 120px;
  height: 120px;
  margin-bottom: 12px;
`;

const Image = styled.Image`
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
