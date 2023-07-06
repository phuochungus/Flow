import React from 'react';
import styled from 'styled-components/native';




const PopularAlbumInHome = props => {
    return (
      <Container>
        <ImageContainer>
          <Image source={require('../assets/images/Artist.png')} />
        </ImageContainer>
        <TextContainer>
          <Title>{props.title}</Title>
          <Artist>Album * {props.artist}</Artist>
        </TextContainer>
      </Container>
    );
  };
 
  const Container = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-right: 10px;
    width: 50%;
    padding: 5px;
  `;
 
  const ImageContainer = styled.View`
    width: 180px;
    height: 180px;
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
    padding-left: 5px;
  `;
 
  const Title = styled.Text`
    color: white;
    font-family: 'Noto Sans';
    font-size: 16px;
    font-weight: 700;
  `;
 
  const Artist = styled.Text`
    color: #b1b5bb;
  `;
 
  export default PopularAlbumInHome;

