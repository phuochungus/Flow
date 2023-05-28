import React, {useState} from 'react';
import {Background, ButtonText, Container, HeaderText} from '../../shared';
import scale from '../../constants/responsive';
import {TextInput} from 'react-native-gesture-handler';
import {GradientButton} from '../../components';

export const Login = ({navigation, route}) => {
  const [email, setEmail] = useState('');

  console.log(route);

  return (
    <Background p={15}>
      <InputField
        onChangeText={setEmail}
        alighItems={'flex-start'}
        m={`${scale(22)}px 0px ${scale(40)}px 0px`}
        headerTitle={'Email hoặc tên người dùng'}
        placeHolder={`Nhập email hoặc tên người dùng của bạn`}
      />
      <InputField
        onChangeText={setEmail}
        alighItems={'flex-start'}
        m={`0px 0px ${scale(48)}px 0px`}
        headerTitle={'Mật khẩu'}
        placeHolder={`Nhập mật khẩu`}
      />
      <Container>
        <GradientButton
          width={scale(132)}
          height={scale(48)}
          sWidth={scale(132)}
          sHeight={scale(48)}
          blurWidth={scale(180)}
          blurHeight={scale(70)}
          blurRadius={8}
          onPress={() => {
            navigation.navigate('Artist');
          }}>
          <ButtonText>Đăng nhập</ButtonText>
        </GradientButton>
      </Container>
    </Background>
  );
};

export const InputField = props => {
  return (
    <Container {...props}>
      <Container>
        <HeaderText>{props.headerTitle}</HeaderText>
      </Container>
      <Container flexDirection={'row'}>
        <TextInput
          onChangeText={props.onChangeText}
          placeholder={props.placeHolder}
          placeholderTextColor={'#B1B5BB'}
          style={{
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            flex: 1,
          }}
        />
      </Container>
    </Container>
  );
};
