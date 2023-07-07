import React, {useEffect} from 'react';
import styled from 'styled-components/native';

const FamousArtist = props => {
  const item = props.item;

  return (
    <Container>
      <ImageContainer
        onPress={() => {
          props.navigation.push('Artist', {id: item.id});
        }}>
        <Image source={{uri: props.uri}} />
      </ImageContainer>
      <Title>{props.title}</Title>
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

export default FamousArtist;
