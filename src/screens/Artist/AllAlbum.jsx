import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import scale from '../../constants/responsive';

export const AllAlbum = ({route, navigation}) => {
  const albums = route.params.item;
  //console.log(item);
  return (
    <Container showsVerticalScrollIndicator={false}>
      {albums.map(item => {
        return (
          <ItemContainer
            key={item.id}
            // onPress={() => {
            //   navigation.push('Album', {id: item.id});
            // }}
          >
            <ImageContainer width={scale(112)} height={scale(72)}>
              <CircleContainer width={scale(72)} height={scale(72)}>
                <Circle
                  imageStyle={{borderRadius: 100}}
                  width={scale(64)}
                  height={scale(64)}
                  source={
                    !item.images
                      ? require('../../assets/images/Loading.png')
                      : {uri: item.images[1].url}
                  }>
                  <Round />
                </Circle>
              </CircleContainer>
              <Rectangle
                width={scale(72)}
                height={scale(72)}
                source={
                  !item.images
                    ? require('../../assets/images/Loading.png')
                    : {uri: item.images[0].url}
                }
              />
            </ImageContainer>

            <TextContainer>
              <Name>{item.name}</Name>
              <ArtistContainer>
                {item.artists.map((value, index) => {
                  return (
                    <ArtistItem key={value.id}>
                      <Artist key={index}>{value.name}</Artist>
                      {item.artists[index + 1] && (
                        <EntypoIcon
                          name="dot-single"
                          size={16}
                          color="#dadada"
                        />
                      )}
                    </ArtistItem>
                  );
                })}
              </ArtistContainer>
            </TextContainer>
          </ItemContainer>
        );
      })}
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

const Circle = styled(ImageBackground).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ArtistItem = styled.View`
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

const Round = styled.View`
  width: 32%;
  height: 32%;
  border-radius: 50px;
  background-color: #1e1e1e;
  border: 1px solid #748182;
`;
