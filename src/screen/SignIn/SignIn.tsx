import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {IMG_LOGO} from '../../../assets/images';
import CUSTOM_FONT from '../../constants/fonts';

function SignIn() {
  return (
    <SafeAreaView style={{}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'black'}}>
        <Image source={IMG_LOGO} />
        <Text style={{fontFamily: CUSTOM_FONT.bold}}>
          SLOGAN HAY CÁI GÌ ĐÓ SLOGAN HAY CÁI GÌ ĐÓ{' '}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SignIn;
