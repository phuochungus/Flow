import SoundPlayer from 'react-native-sound';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConstraintMetadata} from 'class-validator/types/metadata/ConstraintMetadata';

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const useAudioHelper = (
  request = {
    listSounds: [],
    timeRate: 15,
    isLogStatus: true,
  },
) => {
  const endPoint = 'https://flow-fbmj.onrender.com/tracks/v2/play/';
  const [listSounds, setListSounds] = useState(request?.listSounds);
  const [timeRate, setTimeRate] = useState(request?.timeRate); // seconds
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [songInfo, setSongInfo] = useState({});
  const [lyrics, setLyrics] = useState({});
  const [index, setIndex] = useState(null);

  useEffect(() => {
    console.log('---------------------');
    console.log(listSounds);
    console.log(timeRate);
    console.log(status);
    console.log(errorMessage);
    console.log(songInfo);
    console.log(lyrics);
    console.log(index);
    console.log(currentTime);
    console.log('-----------------------');
  }, [listSounds, timeRate, status, errorMessage, songInfo, lyrics, index, currentTime]);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && status === 'play') {
        player.getCurrentTime(seconds => {
          setCurrentTime(seconds);
          AsyncStorage.setItem('time-playing', JSON.stringify(seconds));
        });
      }
    }, 100);

    return () => clearInterval(interval);
  });

  //const [speed, setSpeed] =  useState(1);
  // function changeSpeed(value) {
  //     if (player && value > 0 && value <= 2) {
  //         player.setSpeed(value);
  //         setSpeed(value);
  //     }
  // }

  const getSongInfo = async () => {
    if (listSounds.length === 0 || index === null) return;
    const accessToken = await AsyncStorage.getItem('access_token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log('*****');
    console.log(index);
    console.log('*****');
    fetch(
      'https://flow-fbmj.onrender.com/tracks/track/' + listSounds[index]?.id,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setSongInfo(result);
      })
      .catch(error => console.log('error', error));
  };

  const getLyrics = async () => {
    if (listSounds.length === 0 || index === null) return;
    const accessToken = await AsyncStorage.getItem('access_token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://flow-fbmj.onrender.com/lyrics/' + listSounds[index]?.id,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLyrics(result);
      })
      .catch(error => console.log('error', error));
  };

    const handleFavorites = async (method) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log(accessToken);
        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": listSounds[index]?.id,
        });

        var requestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://flow-fbmj.onrender.com/me/favourites", requestOptions)
        // .then(response => response.text())
        .then(result => {console.log("liked"); getSongInfo();})
        .catch(error => console.log('error', error));
    }

  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);

  const initialize = async () => {
    setStatus('loading');
    console.log('lst: ' + listSounds.length);
    if (listSounds.length > 0 && index !== null) {
      if (player) {
        player.release();
      }

      const callback = (error, player) => {
        if (error) {
          setStatus('error');
          setErrorMessage(error.message);
          console.log('error');
        } else {
          setStatus('success');
          setErrorMessage('');
          console.log('success');
        }
        //player.setSpeed(speed);
        setDuration(player.getDuration());
        //pause();
        play(player);
      };

      const currentAudio = listSounds[index].id;
      // If the audio is a 'require' then the second parameter must be the callback.
      let newPlayer = null;
      newPlayer = await new SoundPlayer(
        'https://flow-fbmj.onrender.com/tracks/v2/play/' + currentAudio,
        null,
        error => callback(error, newPlayer),
      );
      if (newPlayer) {
        setPlayer(newPlayer);
        await AsyncStorage.setItem('index-playing', JSON.stringify(index));
      }
    }
  };

  const resetPlayer = id => {
    //listSound=0
    if (player) {
      player.release();
    }
    setStatus('loading');
    const callback = (error, player) => {
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        console.log('error');
      } else {
        setStatus('success');
        setErrorMessage('');
        console.log('success');
      }
      //player.setSpeed(speed);
      setDuration(player.getDuration());
      pause(player);
    };
    const currentAudio = id;
    console.log('curr ', id);
    let newPlayer = null;
    newPlayer = new SoundPlayer(
      'https://flow-fbmj.onrender.com/tracks/v2/play/' + currentAudio,
      null,
      error => callback(error, newPlayer),
    );
    if (newPlayer) {
      setPlayer(newPlayer);
    }
  };

  useEffect(() => {
    if (listSounds && listSounds.length > 0) {
      console.log('index: ', index);
      if (index != -1) {
        console.log(listSounds);
        getSongInfo();
        getLyrics();
        initialize();
        console.log('init');
      }
    }

  }, [index, listSounds]);

  useEffect(() => {
    console.log('list sound');
    if (listSounds.length != 0) setIndex(0);
    console.log('index');
  }, [listSounds]);

  // const changeIndex = async (value) => {
  //     await setIndex(value);
  // }

  const [isShuffle, setIsShuffle] = useState(false);
  const shuffle = () => {
    setIsShuffle(!isShuffle);
  };

  //  useEffect(()=>{
  //     switch (status) {
  //         default: break;
  //         case 'pause':
  //             //AsyncStorage.setItem('is-playing', 'false');
  //             break;
  //         case 'play':
  //             //AsyncStorage.setItem('is-playing', 'true');
  //             break;
  //     }
  // }, [status])

  useEffect(() => {
    if (request.isLogStatus === true) {
      switch (status) {
        default:
          break;
        case 'loading':
          console.log('loading...');
          break;
        case 'next':
          console.log('next...');
          break;
        case 'pause':
          console.log('pause...');
          break;
        case 'play':
          console.log('play...');
          break;
        case 'previous':
          console.log('previous...');
          break;
        case 'stop':
          console.log('stop...');
          break;
      }
    }
  }, [request.isLogStatus, status]);

  const playComplete = isEnd => {
    if (isEnd === true) {
      if (isLoop === false) {
        next();
      } else {
        repeat();
      }
    }
  };

  const repeat = () => {
    setCurrentTime(0);
    play(player);
  };

  const play = async player => {
    if (player) {
      if (isMuted === true) {
        changeVolume(player, 0);
      }
      player.play(playComplete);
      setStatus('play');
      AsyncStorage.setItem('is-playing', 'true');
    }
  };

  const pause = async () => {
    if (player) {
      player.pause();
      setStatus('pause');
      AsyncStorage.setItem('is-playing', 'false');
      console.log('set currTime');
      console.log(currentTime);
      AsyncStorage.setItem('current-time', JSON.stringify(currentTime));
    }
  };

  const stop = () => {
    if (player) {
      player.stop();
      setStatus('stop');
    }
  };

  const [remainingIndices, setRemainingIndices] = useState(
    [...Array(listSounds.length).keys()].filter(value => value !== index),
  );
  useEffect(() => {
    console.log('index2: ', index);
    setRemainingIndices(remainingIndices.filter(value => value !== index));
  }, [index]);

  const next = () => {
    console.log(listSounds);
    if (player && listSounds.length) {
      player.release();
      setCurrentTime(0);
      setStatus('next');

      if (isShuffle === true) {
        let newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(listSounds.length).keys()].filter(
                value => value !== index,
              )
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex((index + 1) % listSounds.length);
      }
    }
  };

  const previous = () => {
    if (player && index > 0) {
      player.release();
      setCurrentTime(0);
      setStatus('previous');
      setIndex(index - 1);

      if (isShuffle === true) {
        console.log(listSounds);
        let newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(listSounds.length).keys()].filter(
                value => value !== index,
              )
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex(index - 1 >= 0 ? index - 1 : listSounds.length - 1);
      }
    }
  };

  // function increaseTime() {
  //     if (player) {
  //         player.getCurrentTime((seconds) => {
  //             if (seconds + timeRate < duration) {
  //                 seekToTime(seconds + timeRate)
  //             } else {
  //                 seekToTime(duration);
  //             }
  //         });
  //     }
  // }

  // function decreaseTime() {
  //     if (player) {
  //         player.getCurrentTime((seconds) => {
  //             if (seconds - timeRate > 0) {
  //                 seekToTime(seconds - timeRate);
  //             } else {
  //                 seekToTime(0);
  //             }
  //         });
  //     }
  // }

  const seekToTime = seconds => {
    if (player) {
      player.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  };

  const [isLoop, setIsLoop] = useState(false);
  const loop = () => {
    setIsLoop(!isLoop);
  };

  const [volume, setVolume] = useState(100);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const changeVolume = (player, volume) => {
    if (player && volume >= 0 && volume <= 100) {
      player.setVolume(volume / 100.0);
      setVolume(volume);
    }
  };

  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    if (volume > 0 && isMuted === true) {
      setIsMuted(false);
    }
  }, [volume]);

  const mute = () => {
    if (isMuted === false) {
      setIsMuted(true);
      setPreviousVolume(volume);
      changeVolume(player, 0);
    }
  };

  const unmute = () => {
    if (isMuted === true) {
      setIsMuted(false);
      changeVolume(player, previousVolume);
    }
  };

  const formatTimeString = value => {
    return new Date(value * 1000).toISOString().substr(14, 5);
  };

  const getDurationString = () => {
    return formatTimeString(duration);
  };

  const getCurrentTimeString = () => {
    return formatTimeString(currentTime);
  };

  // function getCurrentAudioName() {
  //     return listSounds[index].name;
  // }

  function isDisabledButtonPlay() {
    return status === 'loading' || status === 'play';
  }

  function isDisabledButtonPause() {
    return status === 'loading' || status === 'pause' || status === 'stop';
  }

  // function isDisabledButtonStop() {
  //     return status === 'loading' || status === 'stop';
  // }

  function isDisabledButtonNext() {
    return status === 'loading' || index === listSounds.length - 1;
  }

  function isDisabledButtonPrevious() {
    return status === 'loading' || index === 0;
  }

  return {
    play: () => play(player),
    pause,
    stop,
    next,
    previous,
    // increaseTime,
    // decreaseTime,
    seekToTime,
    //setSpeed: (speed) => changeSpeed(speed),
    shuffle,
    loop,
    mute,
    unmute,
    resetPlayer: id => resetPlayer(id),
    setVolume: volume => changeVolume(player, volume),
    status,
    duration,
    currentTime,
    index,
    songInfo,
    lyrics,
    getSongInfo,
    setPlayerCurrentTime: time => setCurrentTime(time),
    setListSounds: listSounds => setListSounds(listSounds),
    setIndex: index => setIndex(index),
    handleFavorites: method => handleFavorites(method),
    durationString: getDurationString(),
    currentTimeString: getCurrentTimeString(),
    // currentAudioName: getCurrentAudioName(),
    isDisabledButtonPlay: isDisabledButtonPlay(),
    isDisabledButtonPause: isDisabledButtonPause(),
    //isDisabledButtonStop: isDisabledButtonStop(),
    isDisabledButtonNext: isDisabledButtonNext(),
    isDisabledButtonPrevious: isDisabledButtonPrevious(),
    //timeRate,
    //speed,
    isShuffle,
    errorMessage,
    isLoop,
    isMuted,
    volume,
  };
};
