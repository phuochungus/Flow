//import liraries
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import scale from '../../constants/responsive';
import { useState } from 'react';
import { IMG_Remove, IMG_Search } from '../../assets/images';
import FONTS from '../../constants/fonts';
import { SearchElement } from '../../components/index';

// create a component
export const SearchFocused = () => {

    const [searchText, setSearchText] = useState('');
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];

    const removeText = () => {
        setSearchText('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <Image style={styles.searchIcon} source={IMG_Search}/>
                    <TextInput onChangeText={text => setSearchText(text)}
                                value={searchText}
                                placeholder={'Bài hát, nghệ sĩ hoặc podcast'}
                                placeholderTextColor={'#DADADA'}
                                style={styles.searchInput}></TextInput>
                    {searchText == '' ? (
                        <></>
                    ) : ( 
                        <TouchableOpacity onPress={() => removeText()}>
                            <Image style={styles.removeIcon} source={IMG_Remove}/>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity>
                    <Text style={styles.cancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {DATA.length > 0 ? (
                <>
                    <Text style={styles.titleText}>Các tìm kiếm gần đây</Text>
                    <FlatList 
                        data={DATA}
                        renderItem={({item}) => <SearchElement 
                                                    img={require('../../assets/images/Artist.png')} 
                                                    song={'Tên bài hát'} 
                                                    other={'Album - RPT MCK'} 
                                                    result={false}/>}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.deleteText}>Xóa các tìm kiếm gần đây</Text>
                    </TouchableOpacity>
                </>

            ) : (
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>Phát những gì bạn thích</Text>
                    <Text style={styles.text2}>Tìm kiếm nghệ sĩ, bài hát, podcast, ...</Text>
                </View>
            )}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
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
    },
    searchIcon: {
        width: scale(24),
        height: scale(24),
    },
    searchInput: {
        width: scale(338) - scale(24) - scale(30),
        height: '100%',
        color: '#DADADA',
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(15),
    },
    cancel: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(16),
        lineHeight: scale(22),
        color: '#DADADA',
    },
    removeIcon: {
        width: scale(20),
        height: scale(20),
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
    deleteButton: {
        width: scale(200),
        height: scale(32),
        marginBottom: 20,
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: scale(16),
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        fontFamily: FONTS.NotoSans.Medium,
        fontSize: scale(13),
        lineHeight: scale(18),
        color: 'white'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    text1: {
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white',
    },
    text2: {
        fontFamily: FONTS.NotoSans.Regular,
        fontSize: scale(13),
        lineHeight: scale(18),
        color: '#B1B5BB',
    },
});

