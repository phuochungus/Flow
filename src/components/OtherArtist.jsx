import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import scale from '../constants/responsive';

export const OtherArtist = props => {
  const item = props.item;

  return (
    <Container
      onPress={() => {
        props.navigation.push('Artist', {id: item.id});
      }}>
      <ImageContainer height={scale(120)} width={scale(120)}>
        <ArtistImage
          source={
            item.images && item.images.lenth !== 0
              ? {uri: item.images[0]?.url}
              : require('../assets/images/Loading.png')
          }
        />
      </ImageContainer>
      <NameContainer>
        <Name>{item.name}</Name>
      </NameContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 12px;
  max-width: 120px;
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

const NameContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  width: 100%;
  color: #b1b5bb;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
`;
