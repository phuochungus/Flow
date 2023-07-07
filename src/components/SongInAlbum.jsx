import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SongInAlbum = props => {
  const item = props.item;
  return (
    <Container>
      <MainDetail>
        <TextContainer>
          <Title>{item.name}</Title>
          <Artist>{item.artists[0].name}</Artist>
        </TextContainer>
      </MainDetail>
      <Detail onPress={()=>{
        props.navigation.navigate("Playing", {type: 'single', id: item.id})
      }}>
        <Icon name="play" size={32} color="#fff" />
      </Detail>
    </Container>
  );
};


const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 0;
  width: 90%;
`;


const MainDetail = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  margin: 0 20px;
`;


const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;


const Title = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 20px;
  font-weight: 700;
`;


const Artist = styled.Text`
  color: grey;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-weight: 500;
`;


const Detail = styled.TouchableOpacity`
  color: #b1b5bb;
  padding: 8px 0;
`;


export default SongInAlbum;

