//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import { IMG_Search } from '../../assets/images';
import { GenreGroup } from '../../components/index';
import MiniPlaying from '../../components/miniPlaying';

export const SearchDefault = ({navigation, route}) => {

    const [DataGroup, setDataGroup] = useState([]);

    const DataGenre = [
        {
            id: 1,
            genre: 'Nhạc Việt',
            apiName: "NhacViet",
        },
        {
            id: 2,
            genre: 'Cổ điển',
            apiName: "Classic",
        },
        {
            id: 3,
            genre: 'Blues',
            apiName: "Blues",
        },
        {
            id: 4,
            genre: 'Nhạc không lời',
            apiName: "InstrumentalMusic",
        },
        {
            id: 5,
            genre: 'Anime',
            apiName: "Anime",
        },
        {
            id: 6,
            genre: 'Pop',
            apiName: "Pop",
        },
        {
            id: 7,
            genre: 'Bảng xếp hạng',
            apiName: "Top",
        },
        {
            id: 8,
            genre: 'Hip hop',
            apiName: "HipHop",
        },
        {
            id: 9,
            genre: 'K - Pop',
            apiName: "KPop",
        },
        {
            id: 10,
            genre: 'Mới phát hành',
            apiName: "NewMusic",
        },
        {
            id: 11,
            genre: 'J - Pop',
            apiName: "JPop",
        },
        {
            id: 12,
            genre: 'Funk',
            apiName: "Funk",
        },
        {
            id: 13,
            genre: 'Chơi game',
            apiName: "Gaming",
        },
        {
            id: 14,
            genre: 'Indie',
            apiName: "Indie",
        },
        {
            id: 15,
            genre: 'R&B',
            apiName: "R&B",
        },
        {
            id: 16,
            genre: 'Rock',
            apiName: "Rock",
        },
        {
            id: 17,
            genre: 'Tình yêu',
            apiName: "Love",
        },
    ];

    const Colors = [
        {
            id: 1,
            colors: [
                '#056951',
                '#203264',
                '#CF4321',
                '#B02896',
                '#7358FF',
                '#BD6220'
            ]
        },
        {
            id: 2,
            colors: [
                '#1E82AC',
                '#75A768',
                '#E8125C',
                '#25319C',
                '#0C73EC',
                '#056951'
            ]
        },
        {
            id: 3,
            colors: [
                '#1E82AC',
                '#5645AB',
                '#B02896',
                '#056951',
                '#3371E4',
                '#E13300'
            ]
        }
    ]

    useEffect(()=>{
        let count = 0;
        let array = [];
        let result = [];
        let arrApiName = [];
        for (let i = 0; i < DataGenre.length; i++) {
            if ((i + 1) % 6 == 0) {
                array.push(DataGenre[i].genre);
                arrApiName.push(DataGenre[i].apiName);
                count++;
                result.push({id: result.length, genre: array, apiName: arrApiName});
                array = [];
                arrApiName = [];
            } else {
                    array.push(DataGenre[i].genre);
                    arrApiName.push(DataGenre[i].apiName);
            }
        }
        if (array.length > 0) {
            count++;
            result.push({id: result.length, genre: array, apiName: arrApiName});
        }
        setDataGroup(result);
    },[]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Tìm kiếm</Text>
            <View style={styles.header}>
                <View style={styles.search}>
                    <Image style={styles.searchIcon} source={IMG_Search}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('SearchFocused')}>
                        <TextInput onChangeText={text => onChangeText(text)}
                                    value={''}
                                    editable={false}
                                    placeholder={'Bài hát, nghệ sĩ hoặc album'}
                                    placeholderTextColor={'#8A9A9D'}
                                    style={styles.searchInput}></TextInput>
                    </TouchableOpacity> 
                </View>
            </View>
            <Text style={styles.titleText}>Duyệt tìm tất cả</Text>
            {DataGroup.length > 0 ? (
                <FlatList 
                    data={DataGroup}
                    renderItem={({index, item}) => <GenreGroup genre={item.genre} 
                                                                colors={Colors[index].colors} 
                                                                apiName={item.apiName}
                                                                listSong={item.listSong}
                                                                navigation={navigation}
                                                                />}
                    keyExtractor={item => item.id}
                />
            ) : (
                <></>
            )}
            <View style={{height: scale(72)}}/>
            <MiniPlaying navigation={navigation}/>
        </View>
    );
};

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
        width: '100%',
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
        color: 'white',
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

