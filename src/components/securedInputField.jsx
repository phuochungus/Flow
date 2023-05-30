import {TextInput} from 'react-native';
import {Container, HeaderText} from '../shared';
import Icon from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import FONTS from '../constants/fonts';
import {forwardRef, useState} from 'react';

export const SecuredInputField = forwardRef((props, ref) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <Container {...props}>
      <Container>
        <HeaderText>{props.headerTitle}</HeaderText>
      </Container>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeHolder}
          placeholderTextColor={'#B1B5BB'}
          secureTextEntry={isShow}
          blurOnSubmit={props.blurOnSubmit}
          ref={ref}
          onSubmitEditing={props.onSubmitEditing}
          style={{
            color: '#B1B5BB',
            fontFamily: FONTS.NotoSans.Regular,
            fontSize: 15,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            width: '100%',
            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            justifyContent: 'center',
            right: 0,
          }}>
          <View>
            <TouchableHighlight
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setIsShow(!isShow);
              }}
              underlayColor="transparent">
              <View>
                <Icon
                  name={isShow ? 'eye-off' : 'eye'}
                  size={25}
                  color="white"
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Container>
  );
});
