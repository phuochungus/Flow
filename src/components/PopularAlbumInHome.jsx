import React from 'react';
import styled from 'styled-components/native';


const PopularAlbumInHome = props => {
  const item = props.item;
    return (
      <Container>
        <ImageContainer>
          <Image source={{uri: item.images[0].url.toString()}} />
        </ImageContainer>
        <TextContainer>
          <Title>{item.name}</Title>
          <Artist>Album • {item.artists[0].name}</Artist>
        </TextContainer>
      </Container>
    );
  };
  
  const Container = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-right: 2px;
    width: 190px;
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