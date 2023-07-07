import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext } from "react";
// import { PlayingContext } from "./playingContext";



export const addToPlaylist = async (id, player2) => {
    const temp = await AsyncStorage.getItem('list-sound');
    let listSoundNow = JSON.parse(temp);
    let flag = true;
    for (let i = 0; i < listSoundNow.length; i++) {
        if (listSoundNow[i].id == id) {
            flag = false;
            break;
        }
    }
    if (flag) {
        console.log(id);
        listSoundNow.push({'id': id});
        player2.setIsAdding(true);
        player2.setListSounds(listSoundNow);
        AsyncStorage.setItem('list-sound', JSON.stringify(listSoundNow));
    }

}