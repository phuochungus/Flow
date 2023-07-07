import React from 'react';
import styled from 'styled-components/native';


const PopularAlbumInHome = props => {
  const item = props.item;
  const max = item.artists.length;
    return (
      <Container onPress={()=>{
        props.navigation.navigate("Playing", {type: 'single', id: item.id})
      }}>
        <ImageContainer>
          <Image source={{uri: item.images[0].url.toString()}} />
        </ImageContainer>
        <TextContainer>
          <Title>{item.name}</Title>
          <Artist>{
              item.artists.length !== 1 ?
              item.artists.map((item, index) => {
                return (index + 1) === max ? item.name : item.name + ' && ';
              })
              : 
              item.artists.map((item, index) => {
                return item.name;
              })
            }</Artist>
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