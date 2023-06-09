//import liraries

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/routes';
import { Artist } from './src/screens/Artist/Artist';
import { Playing } from './src/screens/Playing/Playing';
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
  return (
    // <NavigationContainer linking={linking}>
    //   <RootNavigation />
    // </NavigationContainer>
    <Playing />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
