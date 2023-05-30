import React, {useRef, useState} from 'react';
import {Background, ButtonText, Container} from '../../shared';
import scale from '../../constants/responsive';
import {GradientButton, InputField} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import {SecuredInputField} from '../../components/securedInputField';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';

export const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [DOB, setDOB] = useState();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const DOBRef = useRef();
  const usernameRef = useRef();
  const buttonRef = useRef();

  function isValidDateString(dateString) {
    let date = moment(DOB, 'DD/MM/YYYY').toDate();
    return date.getTime() > 0;
  }

  return (
    <Background p={15}>
      <ScrollView>
        <InputField
          value={email}
          onChangeText={setEmail}
          headerTitle="Email đăng ký của bạn"
          placeHolder="Nhập email đăng ký tài khoản"
          alighItems={'flex-start'}
          m={`${scale(22)}px 0px ${scale(40)}px 0px`}
          ref={emailRef}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        <SecuredInputField
          value={password}
          onChangeText={setPassword}
          headerTitle={'Mật khẩu'}
          placeHolder={`Nhập mật khẩu`}
          alighItems={'flex-start'}
          m={`0px 0px ${scale(48)}px 0px`}
          ref={passwordRef}
          onSubmitEditing={() => {
            rePasswordRef.current.focus();
          }}
          blurOnSubmit={false}
        />

        <SecuredInputField
          value={rePassword}
          onChangeText={setRePassword}
          headerTitle={'Xác nhận lại mật khẩu'}
          placeHolder={`Nhập mật khẩu`}
          alighItems={'flex-start'}
          m={`0px 0px ${scale(48)}px 0px`}
          ref={rePasswordRef}
          onSubmitEditing={() => {
            DOBRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        <InputField
          value={DOB}
          onChangeText={setDOB}
          headerTitle={'Ngày sinh của bạn'}
          placeHolder={`Ngày tháng năm sinh, format: 12/01/2000`}
          alighItems={'flex-start'}
          m={`0px 0px ${scale(48)}px 0px`}
          ref={DOBRef}
          onSubmitEditing={() => {
            if (isValidDateString(DOB)) usernameRef.current.focus();
            else {
              Snackbar.show({
                duration: Snackbar.LENGTH_LONG,
                text: 'Ngày sinh không đúng định dạng: 19/05/2001, 20/1/1990',
                backgroundColor: 'red',
                textColor: 'black',
              });
            }
          }}
          blurOnSubmit={false}
        />
        <InputField
          value={username}
          onChangeText={setUsername}
          headerTitle={'Tên của bạn'}
          placeHolder={`Nhập tên của bạn`}
          alighItems={'flex-start'}
          m={`${scale(22)}px 0px ${scale(40)}px 0px`}
          ref={usernameRef}
          onSubmitEditing={() => {
            if (!isValidDateString(DOB)) {
              Snackbar.show({
                duration: Snackbar.LENGTH_LONG,
                text: 'Ngày sinh không đúng định dạng: 19/05/2001, 20/1/1990',
                backgroundColor: 'red',
                textColor: 'black',
              });
              DOBRef.current.focus();
            }
          }}
        />
        <Container>
          {isLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <GradientButton width={scale(132)} height={scale(48)}>
              <ButtonText>Tạo tài khoản</ButtonText>
            </GradientButton>
          )}
        </Container>
      </ScrollView>
    </Background>
  );
};
