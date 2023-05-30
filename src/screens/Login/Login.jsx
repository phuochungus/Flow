import React, {useState} from 'react';
import {Background, ButtonText, Container} from '../../shared';
import scale from '../../constants/responsive';
import {GradientButton, InputField} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export const Login = ({navigation}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (username && password) {
      const trimmedUsername = username.trim();
      setUsername(trimmedUsername);
      var headers = new Headers();
      headers.append('accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        username: trimmedUsername,
        password: password,
      });

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };

      try {
        setIsLoading(true);
        const response = await fetch(
          'https://flow-backend.herokuapp.com/auth/local',
          requestOptions,
        );
        if (response.status == 201) {
          const {accessToken} = await response.json();
          AsyncStorage.setItem('access_token', accessToken);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Artist'}],
            }),
          );
        } else if (response.status == 401) {
          Snackbar.show({
            text: 'Username or password incorrect',
            backgroundColor: 'red',
          });
        } else {
          Snackbar.show({
            text: 'There is a tiny problem with server',
            textColor: 'black',
            backgroundColor: 'yellow',
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else if (!username) {
      Snackbar.show({
        text: 'Username is required',
      });
      firstTextInput.focus();
    } else if (!password) {
      Snackbar.show({
        text: 'Password is required',
      });
      secondTextInput.focus();
    }
  };

  return (
    <Background p={15}>
      <ScrollView>
        <InputField
          value={username}
          onChangeText={setUsername}
          alighItems={'flex-start'}
          m={`${scale(22)}px 0px ${scale(40)}px 0px`}
          headerTitle={'Email hoặc tên người dùng'}
          placeHolder={`Nhập email hoặc tên người dùng của bạn`}
          forwardRef={input => {
            this.firstTextInput = input;
          }}
          onSubmitEditing={() => {
            this.secondTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <InputField
          value={password}
          isPassword={true}
          onChangeText={setPassword}
          alighItems={'flex-start'}
          m={`0px 0px ${scale(48)}px 0px`}
          headerTitle={'Mật khẩu'}
          forwardRef={input => {
            this.secondTextInput = input;
          }}
          onSubmitEditing={handleLogin}
          placeHolder={`Nhập mật khẩu`}
        />
        <Container>
          {isLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <GradientButton
              width={scale(132)}
              height={scale(48)}
              sWidth={scale(132)}
              sHeight={scale(48)}
              blurWidth={scale(180)}
              blurHeight={scale(70)}
              blurRadius={8}
              onPress={handleLogin}>
              <ButtonText>Đăng nhập</ButtonText>
            </GradientButton>
          )}
        </Container>
      </ScrollView>
    </Background>
  );
};
