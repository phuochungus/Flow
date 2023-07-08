import {TextInput} from 'react-native';
import {Container, HeaderText} from '../shared';
import FONTS from '../constants/fonts';
import {forwardRef} from 'react';

export const InputField = forwardRef((props, ref) => {
  return (
    <Container {...props}>
      <Container>
        <HeaderText>{props.headerTitle}</HeaderText>
      </Container>
      <Container flexDirection={'row'}>
        <TextInput
          secureTextEntry={props.isPassword || false}
          color
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeHolder}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={props.blurOnSubmit}
          placeholderTextColor="#B1B5BB"
          textColo
          ref={ref}
          style={{
            color: '#B1B5BB',
            fontFamily: FONTS.NotoSans.Regular,
            fontSize: 15,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            flex: 1,
          }}
        />
      </Container>
    </Container>
  );
});
