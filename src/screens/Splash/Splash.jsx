import React, {useRef, useEffect} from 'react';
import {Animated, Image} from 'react-native';
import {F, L, O, W} from '../../assets/images/Splash/';
import styled from 'styled-components';

export const Splash = () => {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const rotateValue = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacityValue = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity]);

  return (
    <Container>
      <LogoContainer style={{transform: [{scale: opacityValue}]}}>
        <Image source={F} />
        <Image source={L} />
        <Animated.Image
          style={{
            transform: [{rotate: rotateValue}],
            borderRadius: 50,
          }}
          source={O}
        />
        <Image source={W} />
      </LogoContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: #121212;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const LogoContainer = styled(Animated.View)`
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
`;