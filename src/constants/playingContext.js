import { useState, createContext, useEffect } from "react";
import { useAudioHelper } from "../helper/sound-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const PlayingContext = createContext();

export const PlayingProvider = ({children}) => {

    //const [player2, setPlayer2] = useState(null);
    const [ini, setIni] = useState(true);
    const [ini2, setIni2] = useState(true);
    const [isChangeIndex, setIsChangeIndex] = useState(true);
    const [index, setId] = useState();
    const [time, setTime] = useState();

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
        // await player2.setListSounds(list);
        // await player2.pause
    }

    const getlist = async () => {
        let temp = null;
        temp = await AsyncStorage.getItem('list-sound');
        const list = JSON.parse(temp);
        temp = await AsyncStorage.getItem('index-playing');
        //console.log(temp);
        setId(parseInt(temp));
        temp = await AsyncStorage.getItem('time-playing');
        //console.log(temp);
        setTime(parseFloat(temp));

        console.log('abc');

        //console.log(result[0].id);
        if (list?.length > 0) {
            init()
            .then(function() {
                player2.setListSounds(list);
            })
        }
    }

    useEffect(()=>{
        const lst = getlist();
    }, [])

    useEffect(()=>{
        if (player2.status === 'play' && ini) {
            setIni(false);
            player2.pause();
            if (index === 0)
                setIsChangeIndex(false);
            player2.setIndex(index);
            // player2.seekToTime(time);
        }
        if (player2.status === 'play' && ini2 && !ini) {
            setIni2(false);
            player2.pause();
            player2.seekToTime(time);
        }
        if (!isChangeIndex && ini2) {
            setIni2(false);
            player2.pause();
            player2.seekToTime(time);
        }
    }, [player2.status, isChangeIndex])

    return (
        <PlayingContext.Provider value={{player2, changePlayer, setListSounds}}>
            {children}
        </PlayingContext.Provider>
    )
}
