import React from 'react';
import {Image, View, TouchableOpacity, ScrollView} from 'react-native';
import {IMG_FACEBOOK, IMG_GOOGLE, IMG_LOGO} from '../../../assets/images';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import DropShadow from 'react-native-drop-shadow';
import scale from '../../constants/responsive';
import {StyleSheet} from 'react-native';

const SignIn = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BlackBackground>
        <Container m={`${scale(161)}px 0px 0px 0px`}>
          <Img source={IMG_LOGO} height={scale(81)} width={scale(232)} />
        </Container>
        <Container m={`${scale(60)}px 0px ${scale(60)}px 0px`}>
          <SloganText>SLOGAN HAY CÁI GÌ ĐÓ SLOGAN HAY CÁI GÌ ĐÓ </SloganText>
        </Container>
        <ShadowContainer>
          <GradientShadow />
          <Container position={'absolute'}>
            <GradientButton>
              <ButtonText>ĐĂNG KÝ TÀI KHOẢN NGAY</ButtonText>
            </GradientButton>
          </Container>
        </ShadowContainer>
        <Container m={`${scale(32)}px 0px 0px 0px`}>
          <StyledOutlineButton>
            <SizedContainer
              flexDirection={'row'}
              h={scale(32.05)}
              w={scale(300)}>
              <Container m={`0px 10px 0px 0px`}>
                <Img source={IMG_GOOGLE} height={scale(32)} width={scale(32)} />
              </Container>
              <ButtonText>TIẾP TỤC BẰNG TÀI KHOẢN GOOGLE</ButtonText>
            </SizedContainer>
          </StyledOutlineButton>
        </Container>
        <Container m={`${scale(32)}px 0px 0px 0px`}>
          <StyledOutlineButton>
            <SizedContainer
              flexDirection={'row'}
              h={scale(32.05)}
              w={scale(300)}>
              <Container m={`0px 10px 0px 0px`}>
                <Img
                  source={IMG_FACEBOOK}
                  height={scale(32)}
                  width={scale(32)}
                />
              </Container>
              <ButtonText>TIẾP TỤC BẰNG TÀI KHOẢN FACEBOOK</ButtonText>
            </SizedContainer>
          </StyledOutlineButton>
        </Container>
        <ShadowContainer m={`${scale(32)}px 0px ${scale(32)}px 0px`}>
          <GradientShadow />
          <Container position={'absolute'}>
            <StyledOutlineButtonCenter>
              <ButtonText>ĐĂNG NHẬP</ButtonText>
            </StyledOutlineButtonCenter>
          </Container>
        </ShadowContainer>
      </BlackBackground>
    </ScrollView>
  );
};

const Img = styled(Image).attrs(({source}) => ({
  source: source,
}))`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const BlackBackground = styled(View)`
  background-color: black;
  flex: 1;
  padding: ${scale(23)}px;
`;

const GradientButton = ({children}) => {
  return (
    <TouchableOpacity>
      <StyledDropShadow>
        <StyledButton>{children}</StyledButton>
      </StyledDropShadow>
    </TouchableOpacity>
  );
};

const GradientShadow = () => {
  return (
    <>
      <StyledButtonShadow />
      <StyledBlurView />
    </>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${props => props.m || '0px'};
  position: ${props => props.position || 'relative'};
  flex-direction: ${props => props.flexDirection || 'column'};
  padding: ${props => props.p || '0px'};
`;

const SizedContainer = styled(Container)`
  height: ${props => props.h}px;
  width: ${props => props.w}px;
`;

const ShadowContainer = styled(Container)`
  height: 90px;
`;

const StyledBlurView = styled(BlurView).attrs({
  blurRadius: 10,
  blurType: 'light',
  overlayColor: '',
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledDropShadow = styled(DropShadow)`
  shadow-color: black;
  shadow-offset: 2px 2px;
  shadow-radius: 1px;
  shadow-opacity: 0.75;
`;

const StyledOutlineButton = styled.TouchableOpacity`
  elevation: 5;
  width: ${scale(364)}px;
  height: ${scale(52)}px;
  padding: ${scale(10)}px ${scale(32)}px;
  background: #1e1e1e;
  border: 1px solid #b1b5bb;
  border-radius: 26px;
`;

const StyledOutlineButtonCenter = styled(StyledOutlineButton)`
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1188, 0.8163],
  useAngle: true,
  angle: 98.99,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${scale(10)}px ${scale(12)}px;
  border-radius: 26px;
  width: ${scale(364)}px;
  height: ${scale(52)}px;
`;

const ButtonText = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: ${scale(15)}px;
`;

const SloganText = styled(ButtonText)`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  margin-top: ${scale(60)}px;
`;

const StyledButtonShadow = styled(LinearGradient).attrs({
  colors: ['#0085FF', '#E70DFB'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  width: ${scale(370)}px;
  height: ${scale(55)}px;
  border-radius: 26px;
`;

const style = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
  },
  bigLogo: {
    width: scale(232),
    height: scale(81),
  },
  largeMarginTop: {
    marginTop: 161,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  small: {
    height: scale(32),
    width: scale(32),
  },
});

export default SignIn;
