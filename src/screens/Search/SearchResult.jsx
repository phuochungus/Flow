//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import scale from '../../constants/responsive';
import { useState } from 'react';
import { IMG_Remove, IMG_Search } from '../../assets/images';
import FONTS from '../../constants/fonts';
import { GroupResult, SearchElement } from '../../components/index';
import useDebounce from '../../hooks/useDebounce';
import MiniPlaying from '../../components/miniPlaying';

// create a component
export const SearchResult = ({navigation, route}) => {

    const [searchText, setSearchText] = useState('');
    const [selectedId, setSelectedId] = useState('mostRelevant');
    const [searchResult, setSearchResult] = useState({mostRelevant: [], albums: [], tracks: [], artists: []});

    const DataType = [
        {
          id: 'mostRelevant',
          title: 'Kết quả phù hợp nhất',
        },
        {
          id: 'tracks',
          title: 'Bài hát',
        },
        {
          id: 'artist',
          title: 'Nghệ sĩ',
        },
        {
            id: 'albums',
            title: 'Album'
        }
      ];

    const listSong = route.params.listSong;
    const type = route.params.type;

    const removeText = () => {
        setSearchText('');
    }

    const handleSearch = (text) => {
        setSearchText(text);
    }

    const executeSearchQuery = (text)=> {
        if (text == '') {
            setSearchResult({mostRelevant: [], albums: [], tracks: [], artists: []});
            return;
        }
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("https://flow-fbmj.onrender.com/search?query=" + text, requestOptions)
            .then(response => response.json())
            .then(result => { setSearchResult(result)})
            .catch(error => console.log('error', error));
    } 

    const debounceSearch = useDebounce(searchText, 500);
    useEffect(()=>{
        if (debounceSearch == ''){
            setSearchResult({mostRelevant: [], albums: [], tracks: [], artists: []});
        }
        else {
            executeSearchQuery(debounceSearch);
        }
    }, [debounceSearch])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.search}>
                    <Image style={styles.searchIcon} source={IMG_Search}/>
                    <TextInput onChangeText={(text) => {handleSearch(text)}}
                                value={searchText}
                                editable={type == 'all' ? false : true}
                                placeholder={'Bài hát, nghệ sĩ hoặc album'}
                                placeholderTextColor={'#DADADA'}
                                style={styles.searchInput}/>
                    {searchText == '' ? (
                        <></>
                    ) : ( 
                        <TouchableOpacity onPress={() => removeText()}>
                            <Image style={styles.removeIcon} source={IMG_Remove}/>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("SearchDefault")}>
                    <Text style={styles.cancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {type !== 'all' ? (
                <>
                    <View style={{height: 30, marginTop: scale(20), marginLeft: scale(20)}}>
                        <FlatList
                            data={DataType}
                            renderItem={({item, index}) =>
                                item.id !== selectedId
                                ? GroupResult({
                                    type: item.title,
                                    onPress: () => setSelectedId(item.id),
                                    color: '#121212',
                                    })
                                : GroupResult({
                                    type: item.title,
                                    onPress: () => {},
                                    color: '#0085FF',
                                    })
                            }
                            initialNumToRender={4}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            keyExtractor={(item, index) => item.id}
                            extraData={selectedId}
                        />
                    </View>
                    <View style={{marginTop: scale(30), marginBottom: scale(50)}}>
                        <FlatList 
                            data={selectedId == 'mostRelevant' ? searchResult.mostRelevant : 
                            selectedId == 'albums' ? searchResult.albums : 
                            selectedId == 'tracks' ? searchResult.tracks : searchResult.artists}
                            renderItem={({item}) => <SearchElement 
                                                        id={item.id}
                                                        img={item.images[0].url} 
                                                        song={item.name} 
                                                        type={item.type} 
                                                        artists={item.artists}
                                                        result={true}
                                                        navigation={navigation}
                                                        onPress={()=>removeHistory(item.id)}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    
                </>
                
            ) : (<></>)}
            <View style={{marginTop: scale(30), marginBottom: scale(50)}}>
                <FlatList 
                    data={listSong}
                    renderItem={({item}) => <SearchElement 
                                                id={item.id}
                                                img={item.images[0].url} 
                                                song={item.name} 
                                                type={item.type} 
                                                artists={item.artists}
                                                result={true}
                                                navigation={navigation}/>}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <View style={{height: scale(72)}}/>
            <MiniPlaying navigation={navigation}/>
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
        //backgroundColor: 'white'
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
    titleText: {
        width: scale(338),
        marginLeft: scale(20),
        marginTop: scale(20),
        fontFamily: FONTS.RadioCanada.Bold,
        fontSize: scale(24),
        lineHeight: scale(29),
        color: 'white'
    },
    removeIcon: {
        width: scale(20),
        height: scale(20),
    }
});

