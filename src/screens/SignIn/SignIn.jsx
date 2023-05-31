import React, {forwardRef, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {IMG_FACEBOOK, IMG_GOOGLE, IMG_LOGO} from '../../assets/images';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';
import scale from '../../constants/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import {
  Background,
  ButtonText,
  Container,
  Img,
  OutlineButton,
  SizedContainer,
} from '../../shared';
import {GradientButton, GradientButtonOutline} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';

export const SignIn = ({navigation, route}) => {
  useEffect(() => {
    if (route.params?.token) {
      AsyncStorage.setItem('access_token', route.params.token)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Artist'}],
            }),
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
    return () => {};
  }, [route.params]);

  const handleGoogleLogin = async () => {
    try {
      Linking.openURL('https://flow-backend.herokuapp.com/auth/google');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      Linking.openURL('https://flow-backend.herokuapp.com/auth/facebook');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background p={23}>
      <ScrollView>
        <Container m={`117px 0px 0px 0px`}>
          <Img source={IMG_LOGO} height={scale(81)} width={scale(232)} />
        </Container>
        <Container m={`60px 0px 0px 0px`}>
          <SloganText>SLOGAN HAY CÁI GÌ ĐÓ SLOGAN HAY CÁI GÌ ĐÓ </SloganText>
        </Container>
        <Container m={`60px 0px 0px 0px`}>
          <GradientButton
            width={scale(364)}
            height={scale(52)}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <ButtonText>ĐĂNG KÝ TÀI KHOẢN NGAY</ButtonText>
          </GradientButton>
        </Container>
        <Container m={`32px 0px 0px 0px`}>
          <OutlineButton onPress={handleGoogleLogin}>
            <SizedContainer
              flexDirection={'row'}
              justifyContent={'flex-start'}
              alighItems={'center'}
              height={scale(32.05) + 'px'}
              width={scale(300) + 'px'}>
              <Container m={`0px 10px 0px 0px`}>
                <Img source={IMG_GOOGLE} height={scale(32)} width={scale(32)} />
              </Container>
              <ButtonText>TIẾP TỤC BẰNG TÀI KHOẢN GOOGLE</ButtonText>
            </SizedContainer>
          </OutlineButton>
        </Container>
        <Container m={`32px 0px 0px 0px`}>
          <OutlineButton onPress={handleFacebookLogin}>
            <SizedContainer
              alighItems={'center'}
              justifyContent={'flex-start'}
              flexDirection={'row'}
              height={scale(32.05) + 'px'}
              width={scale(300) + 'px'}>
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
        <Container m={`32px 0px 0px 0px`}>
          <GradientButtonOutline
            width={scale(364)}
            height={scale(52)}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <ButtonText>ĐĂNG NHẬP</ButtonText>
          </GradientButtonOutline>
        </Container>
      </ScrollView>
    </Background>
  );
};

export const DropShadowButton = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledDropShadow>{children}</StyledDropShadow>
    </TouchableOpacity>
  );
};

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
