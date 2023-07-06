import { useState, createContext, useEffect } from "react";
import { useAudioHelper } from "../helper/sound-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const PlayingContext = createContext();

export const PlayingProvider = ({children}) => {

    //const [player2, setPlayer2] = useState(null);

    var player2 = useAudioHelper(
        {
            listSounds: [],
            timeRate: 15,
            isLogStatus: true,
        }
    );

    const changePlayer = async (id) => {
        await player2.resetPlayer(id);
    }

    const setListSounds = async (listSounds) => {
        await player2.setListSounds(listSounds);
    }

    const init = async () => {

    }

    const getlist = async () => {
        let temp = null;
        temp = await AsyncStorage.getItem('list-sound');
        const list = JSON.parse(temp);
        temp = await AsyncStorage.getItem('index-playing');
        //console.log(temp);
        const index = parseInt(temp);
        temp = await AsyncStorage.getItem('time-playing');
        //console.log(temp);
        const time = parseFloat(temp);

        console.log('abc');

        //console.log(result[0].id);
        if (list?.length > 0) {
            init()
            .then(function() {
                player2.setListSounds(list);
            })
            .then(function() {
                player2.setIndex(index);
            })
            .then(function() {
                console.log(time);
                player2.seekToTime(time);
            }) 
            // player2.setListSounds(list);
            // console.log(index);
            // console.log(time);
            //player2.setIndex(index);
            //player2.seekToTime(time);
        }
    }

    useEffect(()=>{
        const lst = getlist();
        //console.log(lst[0])
        // if (lst) {
        //     player2.setListSounds(lst);
        // }
    }, [])

    return (
        <PlayingContext.Provider value={{player2, changePlayer, setListSounds}}>
            {children}
        </PlayingContext.Provider>
    )
}
