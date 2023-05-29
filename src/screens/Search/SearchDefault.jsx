//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import { IMG_Remove, IMG_Search } from '../../assets/images';

export const SearchDefault = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Tìm kiếm</Text>
            <View style={styles.header}>
                <View style={styles.search}>
                    <Image style={styles.searchIcon} source={IMG_Search}/>
                    <TouchableOpacity>
                        <TextInput onChangeText={text => onChangeText(text)}
                                    value={''}
                                    editable={false}
                                    placeholder={'Bài hát, nghệ sĩ hoặc podcast'}
                                    placeholderTextColor={'#8A9A9D'}
                                    style={styles.searchInput}></TextInput>
                    </TouchableOpacity> 
                </View>
                <TouchableOpacity>
                    <Text style={styles.cancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Duyệt tìm tất cả</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    titleText: {
        width: scale(338),
        marginLeft: scale(20),
        marginTop: scale(20),
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: scale(44),
        marginLeft: scale(20),
        marginTop: 3,
    },
    search: {
        flexDirection: 'row',
        width: scale(338),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: scale(22),
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    searchIcon: {
        width: scale(24),
        height: scale(24),
    },
    searchInput: {
        width: scale(338) - scale(24) -10,
        height: '100%',
        color: '#8A9A9D',
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(15),
    },
    cancel: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(16),
        lineHeight: scale(22),
        color: '#DADADA',
    },
});

