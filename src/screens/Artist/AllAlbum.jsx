import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import scale from '../../constants/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AllAlbum = () => {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <ItemContainer>
        <ImageContainer width={scale(92)} height={scale(72)}>
          <CircleContainer width={scale(68)} height={scale(72)}>
            <Circle
              height={scale(68)}
              source={require('../../assets/images/Artist.png')}
            />
          </CircleContainer>
          <Rectangle
            width={scale(72)}
            height={scale(72)}
            source={require('../../assets/images/Artist.png')}
          />
        </ImageContainer>

        <TextContainer>
          <Name>Tên album</Name>
          <ArtistContainer>
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
          </ArtistContainer>
        </TextContainer>
      </ItemContainer>
      <ItemContainer>
        <ImageContainer width={scale(92)} height={scale(72)}>
          <CircleContainer width={scale(68)} height={scale(72)}>
            <Circle
              height={scale(68)}
              source={require('../../assets/images/Artist.png')}
            />
          </CircleContainer>
          <Rectangle
            width={scale(72)}
            height={scale(72)}
            source={require('../../assets/images/Artist.png')}
          />
        </ImageContainer>

        <TextContainer>
          <Name>Tên album</Name>
          <ArtistContainer>
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
          </ArtistContainer>
        </TextContainer>
      </ItemContainer>
      <ItemContainer>
        <ImageContainer width={scale(92)} height={scale(72)}>
          <CircleContainer width={scale(68)} height={scale(72)}>
            <Circle
              height={scale(68)}
              source={require('../../assets/images/Artist.png')}
            />
          </CircleContainer>
          <Rectangle
            width={scale(72)}
            height={scale(72)}
            source={require('../../assets/images/Artist.png')}
          />
        </ImageContainer>

        <TextContainer>
          <Name>Tên album</Name>
          <ArtistContainer>
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
            <Artist>Tên ca sĩ</Artist>
            <EntypoIcon name="dot-single" size={16} color="#dadada" />
          </ArtistContainer>
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 15px;
  background-color: #121212;
`;

const ItemContainer = styled.Pressable`
  width: 100%;
  padding: 0px 8px 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Rectangle = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled(View)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const CircleContainer = styled(View)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
`;

const Circle = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: 100%;
  height: ${props => props.height}px;
  border-radius: 50px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  flex: 1;
`;

const Name = styled.Text`
  color: white;
  font-family: Radio Canada;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ArtistContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const Artist = styled.Text`
  font-family: Noto Sans;
  font-size: 13px;
  font-weight: 400;
  color: #dadada;
`;
