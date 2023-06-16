import React, {useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import scale from '../constants/responsive';

export const PopularAlbum = props => {
  const item = props.item;

  return (
    <Container
    // onPress={() => {
    //   console.log(item.id);
    //   props.navigation.navigate('Album', {id: item.id});
    // }}
    >
      <ImageContainer height={scale(120)} width={scale(120)}>
        <AlbumImage
          style={{backgroundColor: item.images == undefined && '#383838'}}
          source={
            item.images !== undefined &&
            item.images !== null && {uri: item.images[0].url}
          }
        />
      </ImageContainer>
      <TextContainer>
        <NameContainer>
          <Name>{item.name}</Name>
        </NameContainer>
        {item.yearPublish && <Year>{item.yearPublish}</Year>}
      </TextContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 12px;
  max-width: 120px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Name = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
`;

const Year = styled.Text`
  color: #b1b5bb;
`;
