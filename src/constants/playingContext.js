import {useState, createContext, useEffect} from 'react';
import {useAudioHelper} from '../helper/sound-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlayingContext = createContext();

export const PlayingProvider = ({children}) => {
  //const [player2, setPlayer2] = useState(null);
  const [ini, setIni] = useState(true);
  const [ini2, setIni2] = useState(true);
  const [isChangeIndex, setIsChangeIndex] = useState(true);
  const [index, setId] = useState();
  const [time, setTime] = useState();

  var player2 = useAudioHelper({
    listSounds: [],
    timeRate: 15,
    isLogStatus: true,
  });

  const init = async () => {};

  const getlist = async () => {
    let temp = null;
    temp = await AsyncStorage.getItem('list-sound');
    const list = JSON.parse(temp);
    temp = await AsyncStorage.getItem('index-playing');
    setId(parseInt(temp));
    temp = await AsyncStorage.getItem('time-playing');
    setTime(parseFloat(temp));

    if (list?.length > 0) {
      init()
        .then(function () {
          player2.setListSounds(list);
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    initial();
    // const lst = getlist();
    getlist().catch(error => console.error(error));
  }, []);

  const initial = async () => {
    let a = await AsyncStorage.getItem('list-sound');
    let b = await AsyncStorage.getItem('access_token');
    if (a !== null && b !== null) {
    } else {
      AsyncStorage.setItem(
        'list-sound',
        JSON.stringify([{id: '3zhbXKFjUDw40pTYyCgt1Y'}]),
      );
      AsyncStorage.setItem('index-playing', '0');
      AsyncStorage.setItem('time-playing', '0');
      //player2.setListSounds([{'id': '3zhbXKFjUDw40pTYyCgt1Y'}]);

      console.log('success');
    }
  };

  useEffect(() => {
    if (player2.status === 'play' && ini) {
      setIni(false);
      player2.pause();
      if (index === 0) setIsChangeIndex(false);
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
  }, [player2.status, isChangeIndex]);

  return (
    <PlayingContext.Provider value={{player2}}>
      {children}
    </PlayingContext.Provider>
  );
};
