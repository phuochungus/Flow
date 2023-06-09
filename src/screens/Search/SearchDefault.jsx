//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import scale from '../../constants/responsive';
import FONTS from '../../constants/fonts';
import { IMG_Search } from '../../assets/images';
import { GenreGroup } from '../../components/index';

export const SearchDefault = () => {

    const [DataGroup, setDataGroup] = useState([]);

    const DataTest = [
        {
            id: 1,
            genre: 'Nhạc Việt'
        },
        {
            id: 2,
            genre: 'Cổ điển'
        },
        {
            id: 3,
            genre: 'Blues'
        },
        {
            id: 4,
            genre: 'Nhạc không lời'
        },
        {
            id: 5,
            genre: 'Anime'
        },
        {
            id: 6,
            genre: 'Pop'
        },
        {
            id: 7,
            genre: 'Bảng xếp hạng'
        },
        {
            id: 8,
            genre: 'Hip hop'
        },
        {
            id: 9,
            genre: 'K - Pop'
        },
        {
            id: 10,
            genre: 'Mới phát hành'
        },
        {
            id: 11,
            genre: 'J - Pop'
        },
        {
            id: 12,
            genre: 'Funk'
        },
        {
            id: 13,
            genre: 'Chơi game'
        },
        {
            id: 14,
            genre: 'Indie'
        },
        {
            id: 15,
            genre: 'R&B'
        },
        {
            id: 16,
            genre: 'Rock'
        },
        {
            id: 17,
            genre: 'Tình yêu'
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
            for (let i = 0; i < DataTest.length; i++) {
                if ((i + 1) % 6 == 0) {
                    array.push(DataTest[i].genre);
                    count++;
                    result.push({id: result.length, genre: array});
                    array = [];
                } else {
                        array.push(DataTest[i].genre);
                }
            }
            if (array.length > 0) {
                count++;
                result.push({id: result.length, genre: array});
            }
            console.log(result);
            setDataGroup(result);
    },[]);

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
            {DataGroup.length > 0 ? (
                <FlatList 
                    data={DataGroup}
                    renderItem={({index, item}) => <GenreGroup genre={item.genre} colors={Colors[index].colors}/>}
                    keyExtractor={item => item.id}
                />
            ) : (
                <></>
            )}
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

