//import liraries

import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/routes';
import {PlayingProvider} from './src/constants/playingContext';
import SoundPlayer from 'react-native-sound';
// create a component
const config = {
  screens: {
    SignIn: 'callback',
  },
};

const linking = {
  prefixes: ['flow://'],
  config,
};

const App = () => {
  SoundPlayer.setCategory('Playback');

  return (
    <PlayingProvider >
      <NavigationContainer linking={linking}>
        <RootNavigation />
      </NavigationContainer>
    </PlayingProvider>
  );
};

//make this component available to the app
export default App;
