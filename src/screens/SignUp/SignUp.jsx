import React, {useRef, useState} from 'react';
import {Background, ButtonText, Container} from '../../shared';
import scale from '../../constants/responsive';
import {GradientButton, InputField} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native';
import {SecuredInputField} from '../../components/securedInputField';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import {isEmail} from 'class-validator';

export const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [DOB, setDOB] = useState();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const DOBRef = useRef();
  const usernameRef = useRef();

  function isValidDateString(dateString) {
    let date = moment(dateString, 'DD/MM/YYYY').toDate();
    return date.getTime() > 0;
  }

  function showSnackBar(text, backgroundColor) {
    Snackbar.show({
      duration: Snackbar.LENGTH_LONG,
      text,
      backgroundColor: backgroundColor || 'red',
      textColor: 'white',
    });
  }

  function validateDOB() {
    if (isValidDateString(DOB)) return true;
    showSnackBar('Ngày sinh không đúng định dạng: 19/05/2001, 20/1/1990');
    return false;
  }

  function validatePasswordMatch() {
    if (password === rePassword) return true;
    showSnackBar('Mật khẩu không khớp');
    return false;
  }

  function validateEmail() {
    if (email) {
      if (isEmail(email)) return true;
      else showSnackBar('Email không hợp lệ');
    } else showSnackBar('Email không được phép rỗng');
    return false;
  }

  function validateUsername() {
    if (username) {
      return true;
    } else showSnackBar('Tên không được phép rỗng');
    return false;
  }

  const handleButton = async () => {
    if (
      validatePasswordMatch() &&
      validateDOB() &&
      validateEmail() &&
      validateUsername()
    ) {
      setIsLoading(true);

      var headers = new Headers();
      headers.append('accept', '*/*');
      headers.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        email,
        username,
        birth: moment(DOB, 'DD/MM/YYYY').toISOString(),
        password,
      });

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };

      try {
        let response = await fetch(
          'https://flow-backend.herokuapp.com/users',
          requestOptions,
        );
        console.log(response);
        if (response.status == 409) {
          console.log(await response.text());
          setIsEmailTaken(true);
        } else if (response.status == 201) {
          showSnackBar('Tạo tài khoản mới thành công', 'green');
          navigation.popToTop();
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

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
        {isEmailTaken ? (
          <>
            <Text style={{color: 'red', marginBottom: 20}}>
              *Email đã được sử dụng
            </Text>
          </>
        ) : (
          <></>
        )}
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
            if (validateDOB()) usernameRef.current.focus();
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
                textColor: 'white',
              });
              DOBRef.current.focus();
            }
          }}
        />
        <Container>
          {isLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <GradientButton
              width={scale(132)}
              height={scale(48)}
              onPress={handleButton}>
              <ButtonText>Tạo tài khoản</ButtonText>
            </GradientButton>
          )}
        </Container>
      </ScrollView>
    </Background>
  );
};
