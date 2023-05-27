import React, {useEffect} from 'react';
import {TouchableOpacity, ScrollView, View} from 'react-native';
import {IMG_FACEBOOK, IMG_GOOGLE, IMG_LOGO} from '../../assets/images';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import DropShadow from 'react-native-drop-shadow';
import scale from '../../constants/responsive';
import {authorize} from 'react-native-app-auth';
import {Linking} from 'react-native';
import {
  Background,
  ButtonText,
  Container,
  Img,
  OutlineButton,
  ShadowContainer,
  SizedContainer,
} from '../../shared';
import {GradientButton, GradientButtonOutline} from '../../components';

export const SignIn = () => {
  const GOOGLE_CLIENT_ID =
    '940998776447-oee711om5d818g4a0ats6osvhlrf079i.apps.googleusercontent.com';
  const config = {
    usePKCE: false,
    clientId: GOOGLE_CLIENT_ID,
    redirectUrl: 'https://flow-backend.herokuapp.com/auth/google-redirect',
    scopes: ['email', 'profile'],
    issuer: 'https://accounts.google.com',
    connectionTimeoutSeconds: 5,
    warmAndPrefetchChrome: true,
  };

  const handleDeepLink = ({url}) => {
    // const token = parseTokenFromURL(url);
    console.log(url);
  };

  useEffect(() => {
    const listener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      listener.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await authorize(config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Background>
        <Container m={`${scale(161)}px 0px 0px 0px`}>
          <Img source={IMG_LOGO} height={scale(81)} width={scale(232)} />
        </Container>
        <Container m={`${scale(60)}px 0px ${scale(60)}px 0px`}>
          <SloganText>SLOGAN HAY CÁI GÌ ĐÓ SLOGAN HAY CÁI GÌ ĐÓ </SloganText>
        </Container>
        <Container>
          <GradientButton
            width={scale(364)}
            height={scale(52)}
            sWidth={scale(370)}
            sHeight={scale(55)}>
            <ButtonText>ĐĂNG KÝ TÀI KHOẢN NGAY</ButtonText>
          </GradientButton>
        </Container>
        <Container m={`${scale(32)}px 0px 0px 0px`}>
          <OutlineButton onPress={handleLogin}>
            <SizedContainer
              flexDirection={'row'}
              justifyContent={'flex-start'}
              alighItems={'center'}
              height={scale(32.05)}
              width={scale(300)}>
              <Container m={`0px 10px 0px 0px`}>
                <Img source={IMG_GOOGLE} height={scale(32)} width={scale(32)} />
              </Container>
              <ButtonText>TIẾP TỤC BẰNG TÀI KHOẢN GOOGLE</ButtonText>
            </SizedContainer>
          </OutlineButton>
        </Container>
        <Container m={`${scale(32)}px 0px 0px 0px`}>
          <OutlineButton>
            <SizedContainer
              alighItems={'center'}
              justifyContent={'flex-start'}
              flexDirection={'row'}
              height={scale(32.05)}
              width={scale(300)}>
              <Container m={`0px 10px 0px 0px`}>
                <Img
                  source={IMG_FACEBOOK}
                  height={scale(32)}
                  width={scale(32)}
                />
              </Container>
              <ButtonText>TIẾP TỤC BẰNG TÀI KHOẢN FACEBOOK</ButtonText>
            </SizedContainer>
          </OutlineButton>
        </Container>
        <Container m={`${scale(32)}px 0px ${scale(32)}px 0px`}>
          {/* <GradientShadow sWidth={scale(370)} sHeight={scale(55)} />
          <Container position={'absolute'}>
            <OutlineButton justifyContent={'center'} alighItems={'center'}>
              <ButtonText>ĐĂNG NHẬP</ButtonText>
            </OutlineButton>
          </Container> */}
          <GradientButtonOutline
            width={scale(364)}
            height={scale(52)}
            sWidth={scale(370)}
            sHeight={scale(55)}>
            <ButtonText>ĐĂNG NHẬP</ButtonText>
          </GradientButtonOutline>
        </Container>
      </Background>
    </ScrollView>
  );
};

export const GradientBlurShadow = ({...rest}) => {
  return (
    <>
      <ButtonShadow {...rest} />
      <ShadowBlur />
    </>
  );
};

export const DropShadowButton = ({children, ...rest}) => {
  return (
    <TouchableOpacity onPress={rest.onPress}>
      <StyledDropShadow>{children}</StyledDropShadow>
    </TouchableOpacity>
  );
};

const ShadowBlur = styled(BlurView).attrs({
  blurRadius: 7,
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

export const StyledGradientView = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1188, 0.8163],
  useAngle: true,
  angle: 98.99,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 26px;
  padding: ${props => props.pad || '0px'};
  width: ${props => props.width || 0}px;
  height: ${props => props.height || 0}px;
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

const ButtonShadow = styled(LinearGradient).attrs({
  colors: ['#0085FF', '#E70DFB'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 26px;
  width: ${props => props.sWidth || 0}px;
  height: ${props => props.sHeight || 0}px;
`;
